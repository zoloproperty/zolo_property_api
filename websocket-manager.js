const JWT = require("jsonwebtoken");
const adsController = require('./controllers/websocket/adsController')
let io = null;

function registerIO(_io) {
  io = _io;
  io.use(function (socket, next) {
    if (socket.handshake.query && socket.handshake.query.token) {
      validateToken(socket.handshake.query.token);
    } else {
      next(new Error("Authentication error"));
    }
  }).on("connection", function (socket) {
    // Connection now authenticated to receive further events

    socket.on("ads", () => {
      adsController.broadcast(socket);    });
  });
}

async function validateToken(authorization) {
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
    return res.json(
      new Response(401, "F").custom(authHandler("TOKEN_EXPIRED"))
    );
  }

  if (!authData.is_active) {
    return res.json(
      new Response(401, "F").custom(authHandler("TOKEN_EXPIRED"))
    );
  }

  next();
}

exports.registerIO = registerIO;
