const express = require("express");
const router = express.Router();
const {login , saveUser ,list,update, delete:deleteController} = require("../controllers/userController");
const { middleware } = require("../helper/middleware/authentication");
const {uploadFiles} = require("../helper/third-party/multipart");


router.post("/list", list);
router.post(
  "/login",
  login
);
router.post(
  "/signUp",
  uploadFiles("public/profile").single("image"),
 saveUser
);
router.put("/update/:id", update);
router.delete("/delete/:id", deleteController);
module.exports = router;
