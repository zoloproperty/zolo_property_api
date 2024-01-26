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
  updateValidation
} = require("../validation-schema/userValidation");
const {
  handleError,
  buildDynamicQuery,
  DeleteRecordById,
  UpdateRecordById,
  AddRecord,
  ListRecordByFilter,
} = require("../utils/utils");
const { filterValidation } = require("../validation-schema/filterValidation");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client();


exports.user_list = async (postData) => {
  const query = {};
  const sortOptions = { limit: 1 };
  const searchFields = ["user", "limit"];
  const removeKey = ["host" ,"authorization"];
  removeKey.map((key) => delete postData[key]);

  return await ListRecordByFilter(
    User,
    postData,
    query,
    sortOptions,
    searchFields,
    filterValidation,
    "user list",
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
      const findUser = await User.findOne({ email });
      if (!findUser || !findUser.is_active || findUser.is_deleted) {
        console.log(findUser.is_active);
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
        user_id: findUser.user_id,
        email: findUser.email,
        image: findUser.image
          ? isValidHttpUrl(findUser.image)
            ? findUser.image
            : `http://${postData.host}/profile/${findUser.image}`
          : null,
        loggedInWith: loggedInWith,
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

    const { error, value } = signupValidationSchema.validate(postData);
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
      console.log(findUser, "value");
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
  const removeKey = ["host"];
  removeKey.map((key) => delete postData[key]);
  return await UpdateRecordById(Contact, postData, updateValidation, "USER");
};


exports.user_delete = async (postData) => {
  return await DeleteRecordById(User, postData.id, "USER");
};
