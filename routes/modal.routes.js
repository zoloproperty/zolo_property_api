const express = require("express");
const router = express.Router();
const {
  list,
  add,
  update,
  delete: deleteController,
} = require("../controllers/modalController");
const { middleware } = require("../helper/middleware/authentication");
const { uploadFiles } = require("../helper/third-party/multipart");

router.post("/list", list);
router.post("/add", uploadFiles("public/modal").single("image"), add);
router.put("/update/:id", uploadFiles("public/modal").single("image"), update);
router.delete("/delete/:id", deleteController);

module.exports = router;
