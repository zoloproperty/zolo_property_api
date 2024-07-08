const { authHandler } = require("../static/messages");
const Response = require("../static/Response");
const JWT = require("jsonwebtoken");

/* -------------------------------------------------------------------------- */
/*                                 JWT Auth Verify                            */
/* -------------------------------------------------------------------------- */

const middleware = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.json(
      new Response(401, "F").custom(authHandler("TOKEN_REQUIRED"))
    );
  }

  const token = authorization.split(" ")[1];

  if (!token) {
    return res.json(new Response(401, "F").custom(authHandler("JWT_INVALID")));
  }

  const decode = JWT.decode(token);

  if (!decode) {
    return res.json(new Response(401, "F").custom(authHandler("AUTH_FAILED")));
  }

  const authData = await JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, {
    ignoreExpiration: true,
  });

  const todayDate = new Date().getTime();

  if (authData.exp < todayDate / 1000) {
    return res.json(new Response(401,"F").custom(authHandler("TOKEN_EXPIRED")));
  }
  
  if (!authData.is_active) {
    return res.json(new Response(401,"F").custom(authHandler("TOKEN_EXPIRED")));
  }
  req.authData = authData;
  delete req?.headers?.authorization;
  next();
};

const signJwt = async (payloadData) => {
  const jwtPayload = payloadData;

  const tokenData = { ...payloadData };

  // JWT token with Payload and secret..
  if(tokenData.role == "admin" || tokenData.role == "broker"){
      tokenData.token = JWT.sign(jwtPayload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_TIMEOUT_DURATION,
      });
  }else{
    tokenData.token = JWT.sign(jwtPayload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "350d",
    });
  }

  const refresh_token = JWT.sign(jwtPayload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_TIMEOUT_DURATION,
  });

  return tokenData;
};

const isRoleIsValid =
  (...role) =>
  (req, res, next) => {
    if (!role.includes(req.authData.role)) {
      return res.status(200).json({
        status: 401,
        success: false,
        info: "Bad Request",
        massage: `${req.authData.role} role is not allowed`,
      });
    }
    next();
  };

const isValidHttpUrl = (string) => {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
};

module.exports = {
  middleware,
  signJwt,
  isValidHttpUrl,
  isRoleIsValid,
};
