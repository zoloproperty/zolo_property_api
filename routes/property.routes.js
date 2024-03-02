const express = require("express");
const router = express.Router();
const {
  list,
  add,
  update,
  delete: deleteController,
  one,
} = require("../controllers/propertyController");
const { middleware } = require("../helper/middleware/authentication");
const { uploadFiles } = require("../helper/third-party/multipart");

router.post("/list", middleware, list);
router.get("/:id", middleware, one);
router.post("/add", uploadFiles("public/property").array("images", 10), add);
router.put(
  "/update/:id",
  uploadFiles("public/property").array("images", 10),
  update
);
router.delete("/delete/:id", deleteController);

module.exports = router;
