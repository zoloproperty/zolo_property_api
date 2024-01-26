const express = require("express");
const router = express.Router();
const {
  login,
  saveUser,
  list,
  update,
  delete: deleteController,
} = require("../controllers/userController");
const {
  middleware,
  isRoleIsValid,
} = require("../helper/middleware/authentication");
const { uploadFiles } = require("../helper/third-party/multipart");

router.post("/list", middleware, list);
router.post("/login", login);
router.post("/signUp", uploadFiles("public/profile").single("image"), saveUser);
router.put(
  "/update/:id",
  middleware,
  uploadFiles("public/profile").single("image"),
  update
);
router.delete(
  "/delete/:id",
  middleware,
  isRoleIsValid("user"),
  deleteController
);
module.exports = router;
