const express = require("express");
const router = express.Router();
const {
  list,
  add,
  update,
  delete: deleteController,
  like_check,
  user_like_list,
  ad_like_check,
  user_interactions
} = require("../controllers/interactionController");
const {
  middleware,
  isRoleIsValid
} = require("../helper/middleware/authentication");

router.post("/list", middleware, list);
router.post("/like", middleware , user_like_list);
router.post("/add", middleware, add);
router.post("/check_like", middleware, like_check);
router.post("/ad_check_like", middleware, ad_like_check);
router.get("/user/:user_id/interactions", middleware, user_interactions);
router.put(
  "/update/:id",
  middleware,
  update
);
router.delete(
  "/delete/:id",
  middleware,
  isRoleIsValid(["admin", "broker"]),
  deleteController
);


module.exports = router;
