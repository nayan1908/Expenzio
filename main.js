const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const { PORT, MONGODB_URL } = require("./config/env-variable");

const authRoutes = require("./routes/auth");
const expenseRouters = require("./routes/expense");
const dashboardRouters = require("./routes/dashboard");

require("./utility/global");

const app = express();
const form = multer();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(form.any());

app.use(cors());
app.use("/auth", authRoutes);
app.use("/dashboard", dashboardRouters);
app.use("/expense", expenseRouters);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    API_RESPONSE.apiFailure(req, res, err.message.toString(), statusCode);
});

mongoose.connect(MONGODB_URL).then((res) => {
    console.log("connected")
    app.listen(PORT)
}).catch(err => console.log(err));