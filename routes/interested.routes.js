const express = require("express");
const router = express.Router();
const {
  list,
  add,
  update,
  delete: deleteController,
} = require("../controllers/interestedController");
const {
  middleware,
  isRoleIsValid,
} = require("../helper/middleware/authentication");

router.post("/list", middleware, list);
router.post("/add", middleware, add);
router.put(
  "/update/:id",
  middleware,
  isRoleIsValid("admin", "broker"),
  update
);
router.delete(
  "/delete/:id",
  middleware,
  isRoleIsValid("admin", "broker"),
  deleteController
);

module.exports = router;
