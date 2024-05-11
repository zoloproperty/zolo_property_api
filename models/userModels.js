const User = require("../Schema/userSchema");
const { compareHash, hashAndSalt } = require("../helper/Bcrypt/bcrypt");
const { authHandler } = require("../helper/static/messages");
const Response = require("../helper/static/Response");
const {
  signJwt,
  isValidHttpUrl,
} = require("../helper/middleware/authentication");
const {
  loginValidationSchema,
  signupValidationSchema,
  updateValidation,
} = require("../validation-schema/userValidation");
const {
  handleError,
  buildDynamicQuery,
  DeleteRecordById,
  UpdateRecordById,
  AddRecord,
  ListRecordByFilter,
} = require("../utils/utils");
const { brokerControl } = require("../utils/brokerControl");
const { filterValidation } = require("../validation-schema/filterValidation");
const { OAuth2Client } = require("google-auth-library");
const { unlinkFile } = require("../helper/third-party/multipart");
const client = new OAuth2Client();

exports.user_list = async (postData) => {
  const query = {};
  const sortOptions = {};
  const searchFields = [
    "first_name",
    "last_name",
    "contact_number",
    "email",
    "role",
    "state",
    "city",
    "zip_code",
  ];

  const userData = postData.authData;
  if (userData.role == "broker") {
    query.role = { $nin: ["admin", "broker"] };
  }

  const removeKey = ["host"];
  removeKey.map((key) => delete postData[key]);

  return await ListRecordByFilter(
    User,
    postData,
    query,
    sortOptions,
    searchFields,
    filterValidation,
    "USER",
    {}
  );
};

exports.login = async (postData) => {
  try {
    let { email } = postData;
    let picture, name;
    const { password, authorization } = postData;
    let loggedInWith = "";
    
    if (authorization) {
      try {
        const token = authorization.split(" ")[1];
        const ticket = await client.verifyIdToken({
          idToken: token,
          audience: process.env.GOOGLE_CLIENT_ID,
        });

        ({ email } = ticket.getPayload());
        ({ picture, name } = ticket.getPayload());

        loggedInWith = "google";
      } catch (error) {
        console.log(error)
        return new Response(400, "F").custom(error.message);
      }
    } else {
      const { error } = loginValidationSchema.validate({ email, password });

      if (error) {
        return new Response(400, "F").custom(error.details[0].message);
      }
      loggedInWith = "username-password";
    }
    try {
      let findUser = await User.findOne({ email });
      if(!findUser){
        const newUser = new User({email, first_name : name, last_name:""});
        const result = await newUser.save();
        findUser = newUser;
      }
      if (!findUser || !findUser.is_active || findUser.is_deleted) {
        let errorMessage = "WRONG";
        if (!findUser) {
          errorMessage = "EMAIL_NOT_EXISTS";
        } else if (!findUser.is_active) {
          errorMessage = "INACTIVE_ACCOUNT";
        } else if (findUser.is_deleted) {
          errorMessage = "DELETED_ACCOUNT";
        }

        return new Response(400, "F").custom(authHandler(errorMessage));
      }

      if (loggedInWith === "username-password") {
        const comparePassword = await compareHash(password, findUser.password);

        if (!comparePassword) {
          return new Response(400, "F").custom(authHandler("WRONG_PASS"));
        }
      } else if (loggedInWith === "google") {
        try {
        } catch (error) {
          return new Response(400, "F").custom(error.message);
        }
      }

      const payLoad = {
        user_id: findUser._id,
        email: findUser.email,
        image: `http://${postData.host}/${(findUser.image||"").replace(/\\/g, "/").replace(/^public\//, '')}`,
        oldImage: findUser.image,
        loggedInWith: loggedInWith,
        first_name: findUser.first_name,
        last_name: findUser.last_name,
        contact_number: findUser.contact_number,
        role: findUser.role,
        city: findUser.city,
        state: findUser.state,
        zip_code: findUser.zip_code,
        local_area: findUser.local_area,
      };
      const jwtToken = await signJwt(payLoad);

      return new Response(200, "T", jwtToken).custom(
        authHandler("AUTH_SUCCESS")
      );
    } catch (error) {
      return new Response(400, "F").custom(error.message);
    }
  } catch (error) {
    return new Response(500, "F").custom(error.message);
  }
};

exports.saveUser = async (postData) => {
  try {
    if (postData?.oldImage) {
      // Handle file deletion if needed
    }
    let updateData = postData;

    if (postData?.file) {
      const image = postData?.file?.location;
      updateData = { ...postData, image };
      delete updateData.files;
    }
    const { error, value } = signupValidationSchema.validate(updateData);
    if (error) {
      return handleError(400, error.details[0].message);
    }

    if (value.password) {
      const { hash } = await hashAndSalt(value.password);
      value.password = hash;
    }
    delete value.user_id;
    delete value.oldImage;

    if (postData?.user_id) {
      const findUser = await User.findOne({ user_id: postData?.user_id });
      if (!findUser) {
        return handleError(400, "USER_NOT_EXISTS");
      }

      // Update user fields
      // ...

      // Save the updated user
      const result = await findUser.save();

      return new Response(result ? 200 : 400, result ? "T" : "F").custom(
        authHandler(result ? "USER_UPDATED" : "USER_UPDATED_FAILED")
      );
    } else {
      const findUser = await User.findOne({
        email: value.email,
        is_deleted: false,
      });

      if (findUser) {
        return handleError(400, "DUPLICATE_EMAIL");
      }

      // Create a new user
      const newUser = new User(value);
      const result = await newUser.save();

      return new Response(result ? 200 : 500, result ? "T" : "F").custom(
        authHandler(result ? "SIGNUP" : "SIGNUP_FAILED")
      );
    }
  } catch (error) {
    return handleError(500, error.message);
  }
};
exports.user_update = async (postData) => {
  const host = postData?.host
  const removeKey = ["host", "authorization"];
  removeKey.map((key) => delete postData[key]);
  let updateData = postData;
  console.log(updateData)

  if(postData?.oldImage){
    unlinkFile(postData?.oldImage)
  }

  if (postData?.file) {
    const image = postData?.file?.location;
    updateData = { ...postData, image };
    delete updateData.files;
  }

  try {
    delete updateData.authData;
    const { error, value } = updateValidation.validate(updateData);
    if (error) return handleError(400, error.details[0].message);
    const existing = await User.findById(value.id);
    if (!existing)
      return new Response(404, "F").custom(
        authHandler(`USER_NOT_EXISTS`)
      );

    Object.assign(existing, value);

    if (await existing.save()) {

      const payLoad = {
        user_id: existing._id,
        email: existing.email,
        image: `http://${host}/${(existing.image||"").replace(/\\/g, "/").replace(/^public\//, '')}`,
        oldImage: existing.image,
        role: existing.role,
        first_name: existing.first_name,
        last_name: existing.last_name,
        contact_number: existing.contact_number,
        city: existing.city,
        state: existing.state,
        zip_code: existing.zip_code,
        local_area: existing.local_area,
      };
      const jwtToken = await signJwt(payLoad);
      return new Response(200, "T", jwtToken).custom(authHandler(`USER_UPD`));
    } else {
      return new Response(400, "F").custom(
        authHandler(`USER_UPD_FAILED`)
      );
    }
  } catch (error) {
    return new Response(400, "F").custom(error.message);
  }
};

exports.user_delete = async (postData) => {
  return await DeleteRecordById(User, postData.id, "USER");
};
