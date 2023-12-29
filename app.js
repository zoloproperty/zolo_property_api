const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const { configDotenv } = require("dotenv");
const app = express();

if (process.env.NODE_ENV !== "Development") {
  configDotenv({ path: ".env" });
}

// DB CONNECTION
require("./config/database/connection.js");

const allowedOrigins = ["http://localhost:3000"];

const corsOptions = {
  origin: allowedOrigins,
};

app.use(cors(corsOptions));

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(helmet());
app.use(cookieParser());
app.use(morgan("dev"));

const brandRouter = require("./routes/brand.routes.js");
const emiRouter = require("./routes/emi.routes.js");
const interestedRouter = require("./routes/interested.routes.js");
const modalRouter = require("./routes/modal.routes.js");
const phoneRouter = require("./routes/phone.routes.js");
const vehicleRouter = require("./routes/vehicle.routes.js");
const userRouter = require("./routes/user.routes.js");

app.use("/brand", brandRouter);
app.use("/emi", emiRouter);
app.use("/interested", interestedRouter);
app.use("/modal", modalRouter);
app.use("/phone", phoneRouter);
app.use("/vehicle", vehicleRouter);
app.use("/user", userRouter);

app.get("*", (req, res) => {
  res.status(404).json({
    code: 404,
    info: "Not Found.",
    status: true,
    message: "The resource you looking for needs an valid end point.",
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT);

module.exports = app;
