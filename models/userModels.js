const User = require("../Schema/userSchema")

const { authHandler } = require("../helper/static/messages");
const Response = require("../helper/static/Response");

exports.login = async (postData) => {
    // try {
    //   let { email } = postData;
    //   let picture, name;
    //   const { password, authorization } = postData;
    //   let loggedInWith = "";
  
    //   if (authorization) {
    //     try {
    //       const token = authorization.split(" ")[1];
    //       const ticket = await client.verifyIdToken({
    //         idToken: token,
    //         audience: process.env.GOOGLE_CLIENT_ID,
    //       });
  
    //       ({ email } = ticket.getPayload());
    //       ({ picture, name } = ticket.getPayload());
  
    //       loggedInWith = "google";
    //     } catch (error) {
    //       return new Response(400, "F").custom(error.message);
    //     }
    //   } else {
    //     const { error } = loginValidationSchema.validate({ email, password });
  
    //     if (error) {
    //       return new Response(400, "F").custom(error.details[0].message);
    //     }
    //     loggedInWith = "username-password";
    //   }
  
    //   try {
    //     const findUser = await knex("ims_users").where({ email }).first();
    //     if (!findUser || findUser.is_active !== 1 || findUser.is_deleted !== 1) {
    //       let errorMessage = "WRONG";
  
    //       if (!findUser) {
    //         errorMessage = "EMAIL_NOT_EXISTS";
    //       } else if (findUser.is_active !== 1) {
    //         errorMessage = "INACTIVE_ACCOUNT";
    //       } else if (findUser.is_deleted !== 1) {
    //         errorMessage = "DELETED_ACCOUNT";
    //       }
  
    //       return new Response(400, "F").custom(authHandler(errorMessage));
    //     }
  
    //     if (loggedInWith === "username-password") {
    //       const comparePassword = await compareHash(password, findUser.password);
  
    //       if (!comparePassword) {
    //         return new Response(400, "F").custom(authHandler("WRONG_PASS"));
    //       }
    //     } else if (loggedInWith === "google") {
    //       try {
    //         // const updateResult = await knex('ims_category').update({image : picture, firstname : name}).where({user_id : findUser.user_id});
    //       } catch (error) {
    //         return new Response(400, "F").custom(error.message);
    //       }
    //     }
  
    //     const payLoad = {
    //       user_id: findUser.user_id,
    //       email: findUser.email,
    //       phone: findUser.phone,
    //       role: findUser.role,
    //       roleText:
    //         findUser.role === 1
    //           ? "Admin"
    //           : findUser.role === 2
    //             ? "Customer"
    //             : "Supplier",
    //       image: findUser.image ? isValidHttpUrl(findUser.image) ? findUser.image : `http://${postData.host}/profile/${findUser.image}` : null,
    //       loggedInWith: loggedInWith,
    //     };
  
    //     const jwtToken = await signJwt(payLoad);
  
    //     return new Response(200, "T", jwtToken).custom(
    //       authHandler("AUTH_SUCCESS")
    //     );
    //   } catch (error) {
    //     return new Response(400, "F").custom(error.message);
    //   }
    // } catch (error) {
    //   return new Response(500, "F").custom(error.message);
    // }
  };
  