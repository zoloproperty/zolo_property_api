const express = require("express");
const router = express.Router();
const {
  list,
} = require("../controllers/dashboardController");
const { middleware } = require("../helper/middleware/authentication");

router.post("/list", middleware, list);

module.exports = router;
