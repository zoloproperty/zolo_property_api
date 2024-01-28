const express = require("express");
const router = express.Router();
const {
  list,
  add,
  update,
  delete: deleteController,
} = require("../controllers/adsController");
const { middleware } = require("../helper/middleware/authentication");
const { uploadFiles } = require("../helper/third-party/multipart");

router.post("/list", middleware, list);
router.post("/add", middleware, uploadFiles("public/ads").array("images", 10) ,add);
router.put("/update/:id",  middleware, uploadFiles("public/ads").array("images", 10) ,update);
router.delete("/delete/:id",middleware, deleteController);

module.exports = router;
