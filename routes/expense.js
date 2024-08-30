const express = require("express");
const { isAuth } = require("../middleware/auth");
const expController = require("../controller/expense");
const expValidator = require("../middleware/expense");
const router = express.Router();

router.post("/", isAuth, expController.getExpenses);
router.get("/:expId", isAuth, expController.getExpense);

router.post("/add", isAuth, expValidator.addExpValidator, expController.addExpense);
router.put("/update/:expId", expValidator.addExpValidator, isAuth, expController.updateExpense);
router.delete("/delete/:expId", isAuth, expController.deleteExpense);


router.get("/monthly_report", isAuth, expController.getMonthlyReport);

module.exports = router;