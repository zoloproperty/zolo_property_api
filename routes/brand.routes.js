const express = require("express");
const router = express.Router();
const {
  list,
  add,
  update,
  delete: deleteController,
  brands,
} = require("../controllers/brandController");
const { middleware } = require("../helper/middleware/authentication");
const { uploadFiles } = require("../helper/third-party/multipart");

router.get("/", brands);
router.post("/list", list);
router.post("/add", uploadFiles("public/brand").single("image"), add);
router.put("/update/:id", uploadFiles("public/brand").single("image"), update);
router.delete("/delete/:id", deleteController);

module.exports = router;
