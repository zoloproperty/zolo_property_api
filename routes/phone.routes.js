const express = require("express");
const router = express.Router();
const {
  list,
  add,
  update,
  delete: deleteController,
} = require("../controllers/phoneController");
const { middleware } = require("../helper/middleware/authentication");

router.post("/list", list);
router.post("/add", middleware, add);
router.put("/update/:id", middleware, update);
router.delete("/delete/:id", deleteController);

module.exports = router;
