const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const { configDotenv } = require("dotenv");
const app = express();
const aws = require("aws-sdk");

if (process.env.NODE_ENV !== "Development") {
  configDotenv({ path: ".env" });
}

// DB CONNECTION
require("./config/database/connection.js");

const allowedOrigins = [
  "http://localhost:3000",
  "https://demo.gpropertypay.com"
];

const corsOptions = {
  origin: function(origin, callback) {
    callback(null, true);
    if (allowedOrigins.includes(origin) || !origin) {
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
};

app.use(cors(corsOptions));
// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: [
        "'self'",
        "https://maps.googleapis.com",
        "https://accounts.google.com",
        "https://demo.gpropertypay.com"
      ],
      imgSrc: ["'self'", "'unsafe-inline'"]
    }
  })
);

app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public/dashboard")));

const dashboardRouter = require("./routes/dashboard.routes.js");
const adsRouter = require("./routes/ads.routes.js");
const interestedRouter = require("./routes/interested.routes.js");
const phoneRouter = require("./routes/phone.routes.js");
const propertyRouter = require("./routes/property.routes.js");
const userRouter = require("./routes/user.routes.js");
const contactRouter = require("./routes/contact.routes.js");
const interactionRouter = require("./routes/interaction.routes.js");

app.use("/dashboard", dashboardRouter);
app.use("/ads", adsRouter);
app.use("/interested", interestedRouter);
app.use("/interaction", interactionRouter);
app.use("/phone", phoneRouter);
app.use("/contact", contactRouter);
app.use("/property", propertyRouter);
app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./public/dashboard"));
});

app.get("*", (req, res) => {
  res.status(404).json({
    code: 404,
    info: "Not Found.",
    status: true,
    message: "The resource you looking for needs an valid end point."
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT);

module.exports = app;
