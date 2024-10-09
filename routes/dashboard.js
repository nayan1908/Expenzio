const express = require("express");
const { isAuth } = require("../middleware/auth");
const { getDashboardData } = require("../controller/dashboard");

const router = express.Router();

router.get("/", isAuth, getDashboardData);

module.exports = router;