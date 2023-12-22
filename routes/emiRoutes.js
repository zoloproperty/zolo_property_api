const express = require("express");
const router = express.Router();
const emiController = require("../controllers/emiController");
const { middleware } = require("../helper/middleware/authentication");

router.post("/list", emiController.list);
router.post("/add", emiController.add);
router.put("/update", emiController.update);
router.delete("/delete", emiController.delete);

module.exports = router;
