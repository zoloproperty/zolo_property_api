const express = require("express");
const router = express.Router();
const {
    deleteAllForAProperty,
    getAllForProperty,
    getMyNotification,

upsert
} = require("../controllers/notificationController");
const { middleware } = require("../helper/middleware/authentication");

router.get("/list/:id", middleware, getAllForProperty);
router.get("/my", middleware, getMyNotification);
router.post("/upsert", middleware, upsert);
router.delete("/delete/:id", middleware, deleteAllForAProperty);

module.exports = router;
