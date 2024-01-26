const express = require("express");
const router = express.Router();
const {login , saveUser ,list, delete:deleteController} = require("../controllers/userController");
const { middleware } = require("../helper/middleware/authentication");
const {uploadFiles} = require("../helper/third-party/multipart");


router.post("/list", list);
router.post(
  "/login",
  uploadFiles("public/profile").single("image"),
  login
);
router.post(
  "/signUp",
  uploadFiles("public/profile").single("image"),
 saveUser
);
router.delete("/delete/:id", deleteController);
module.exports = router;
