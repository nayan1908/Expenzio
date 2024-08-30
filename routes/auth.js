const express = require("express");
const authController = require("../controller/auth");
const { loginValidator, registerValidator } = require("../middleware/auth");
const router = express.Router();

router.post("/login", loginValidator, authController.login);
router.post("/register", registerValidator, authController.register);


module.exports = router;