const express = require("express");
const router = express.Router();
const {
deleteOne,
deleteByUser,
getByUser,
list,
upsert
} = require("../controllers/deviceController");
const { middleware } = require("../helper/middleware/authentication");

router.get("/list", middleware, list);
router.get("/my", middleware, getByUser);
router.delete("/remove", middleware, deleteByUser);
router.post("/upsert", middleware, upsert);
router.delete("/delete/:id", middleware, deleteOne);

module.exports = router;
