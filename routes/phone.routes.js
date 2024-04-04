const express = require("express");
const router = express.Router();
const {
  list,
  add,
  update,
  delete: deleteController,
  one
} = require("../controllers/phoneController");
const {
  middleware,
  isRoleIsValid
} = require("../helper/middleware/authentication");

router.post("/list", middleware, isRoleIsValid("admin"), list);
router.get("/broker", middleware, one);
router.post("/add", middleware, isRoleIsValid("admin"), add);
router.put("/update/:id", middleware, isRoleIsValid("admin"), update);
router.delete(
  "/delete/:id",
  middleware,
  isRoleIsValid("admin"),
  deleteController
);

module.exports = router;
