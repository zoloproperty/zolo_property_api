const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { configDotenv } = require("dotenv");
const app = express();
const http = require("http");

if (process.env.NODE_ENV !== "Development") {
  configDotenv({ path: ".env" });
}

// DB CONNECTION
require("./config/database/connection.js");

const allowedOrigins = ["https://localhost", "https://portal.zoloproperty.in/"];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.some(allowed => origin.includes(allowed))) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
  methods: ["GET", "POST", "PUT", "DELETE"],
};

app.use(cors(corsOptions));
// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
// app.use(morgan("dev"));
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
const mobileAppRouter = require("./routes/mobile-app.routes.js");
const deviceRouter = require("./routes/device.routes.js");
const notificationRouter = require("./routes/notification.routes.js");

app.use("/dashboard", dashboardRouter);
app.use("/ads", adsRouter);
app.use("/interested", interestedRouter);
app.use("/interaction", interactionRouter);
app.use("/phone", phoneRouter);
app.use("/contact", contactRouter);
app.use("/property", propertyRouter);
app.use("/user", userRouter);
app.use("/mobile", mobileAppRouter);
app.use("/device", deviceRouter);
app.use("/notifications", notificationRouter);

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./public/dashboard"));
});

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
