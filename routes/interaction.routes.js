const express = require("express");
const router = express.Router();
const {
  list,
  add,
  update,
  delete: deleteController,
} = require("../controllers/interactionController");
const {
  middleware,
  isRoleIsValid,
} = require("../helper/middleware/authentication");

router.post("/list", middleware, list);
router.post("/add", middleware, add);
router.put(
  "/update/:id",
  middleware,
  isRoleIsValid(["admin", "briker"]),
  update
);
router.delete(
  "/delete/:id",
  middleware,
  isRoleIsValid(["admin", "briker"]),
  deleteController
);

module.exports = router;
