const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { middleware } = require("../helper/middleware/authentication");
const {uploadFiles} = require("../helper/third-party/multipart");

router.post(
  "/login",
  uploadFiles("public/profile").single("image"),
  userController.login
);
router.post(
  "/signUp",
  uploadFiles("public/profile").single("image"),
  userController.saveUser
);

module.exports = router;
