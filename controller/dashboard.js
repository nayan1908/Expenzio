const Expense = require("../models/expense");

exports.getDashboardData = async (req, res, next) => {
    try {
        const result = await Expense.aggregate([
            {
                $match: { user_id: req.user._id }
            },
            {
                $group: {
                    _id: {
                        $concat: [
                            { $dateToString: { format: "%Y-%m", date: "$date" } },
                            "-",
                            { $toString: { $literal: 1 } }
                        ]
                    },
                    total: { $sum: "$price" }
                },
            },
            {
                $project: {
                    _id: 0, // Exclude the default _id
                    month_year: "$_id",
                    total: 1 // include total in output
                }
            },
            {
                $sort: { year: 1, month: 1 }
            }
        ]).exec();

        return API_RESPONSE.apiSuccess(req, res, "Data fetched successfully", result);
    } catch (err) {
        return API_RESPONSE.apiFailure(req, res, err.message, 500);
    }
}