const router = require('express').Router();
const userController = require("../controllers/userController");
const { middleware } = require("../helper/middleware/authentication");

router.post("/login", userController.login);
router.post("/signUp", middleware, userController.saveUser);

module.exports = router;
