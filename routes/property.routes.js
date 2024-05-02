const express = require("express");
const router = express.Router();
const {
  list,
  add,
  update,
  delete: deleteController,
  one,
  user_property
} = require("../controllers/propertyController");
const {
  convert
} = require("../controllers/dataconvrter");
const { middleware } = require("../helper/middleware/authentication");
const { multipleUpload } = require("../helper/third-party/multipart");

router.get("/convert", convert);
router.post("/list", middleware, list);
router.get("/user", middleware, user_property);
router.get("/:id", middleware, one);
router.post(
  "/add",
  multipleUpload.fields([
    { name: "video", maxCount: 1 },
    { name: "images", maxCount: 10 }
  ]),
  add
);
router.put(
  "/update/:id",
  multipleUpload.fields([
    { name: "video", maxCount: 1 },
    { name: "images", maxCount: 10 }
  ]),
  update
);
router.delete("/delete/:id", middleware, deleteController);

module.exports = router;
