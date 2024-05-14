const express = require("express");
const router = express.Router();
const {
  list,
  add,
  update,
  delete: deleteController,
  one
} = require("../controllers/contactController");
const { middleware } = require("../helper/middleware/authentication");

router.post("/list", list);
router.post("/add", add);
router.get("/:id", middleware, one);
router.put("/update/:id", update);
router.delete("/delete/:id", deleteController);

module.exports = router;
