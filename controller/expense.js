const Expense = require("../models/expense");
const { getSysDateFormat } = require("../utility/helper");

exports.addExpense = async (req, res, next) => {
    try {
        const expense = new Expense({
            title: req.body.title,
            description: req.body?.description || "",
            price: req.body.price,
            tag: req.body?.tag || [],
            date: req.body.date,
            user_id: req.user._id
        });
        const expRes = await expense.save();

        return API_RESPONSE.apiSuccess(req, res, "Expense added successfully", expRes);

    } catch (err) {
        return API_RESPONSE.apiFailure(req, res, err.message, 500);
    }
}

exports.updateExpense = async (req, res, next) => {
    const expId = req.params.expId;

    try {
        const expData = await Expense.findById(expId);

        if (!expData) {
            return API_RESPONSE.apiFailure(req, req, "Expense not found", 404);
        } else if (expData.user_id.toString() !== req.user._id.toString()) {
            return API_RESPONSE.apiFailure(req, res, "You have not authorized", 401);
        }

        expData.title = req.body.title;
        expData.description = req.body?.description || expData?.description || "";
        expData.price = req.body.price;
        expData.date = req.body.date;
        expData.tag = req.body?.tag || [];

        const updateExpRes = await expData.save();

        return API_RESPONSE.apiSuccess(req, res, "Expense updated successfully", updateExpRes);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }

}

exports.getExpenses = async (req, res, next) => {
    try {

        let { start_date, end_date, page_index = 1, per_page = 20 } = req.body;
        per_page = parseInt(per_page);

        let query = { user_id: req.user._id };

        if (req.body?.title) {
            query.title = { $regex:  req.body.title, $options: 'i'  };
        }

        if(req.body?.description){
            query.description = { $regex: req.body.description, $options : 'i'};
        }

        if (start_date, end_date) {
            query.date = {
                $gte: new Date(start_date),
                $lte: new Date(end_date)
            }
        }
        console.log(query);
        const skip = (page_index - 1) * per_page;

        const limit = per_page;

        const expenses = await Expense.aggregate([
            { $match: query },
            {
                $project: {
                    title: 1,
                    price: 1,
                    tag: 1,
                    description: 1,
                    date: {
                        $dateToString: { format: '%Y-%m-%d', date: "$date" }
                    }
                }
            },
            {
                $sort: { date: -1, _id: -1 }
            },
            {
                $skip: skip
            },
            {
                $limit: limit
            }
        ]);

        const totalCount = await Expense.countDocuments(query);
        const totalPages = Math.ceil(totalCount / per_page);

        const hasNextPage = page_index < totalPages;
        const hasPrevPage = page_index > 1;

        const pagination = {
            page_index: parseInt(page_index),
            per_page,
            total_count: totalCount,
            total_pages: totalPages,
            has_next_page: hasNextPage,
            has_prev_page: hasPrevPage
        }
        return API_RESPONSE.apiSuccess(req, res, "Expenses fetched successfully", expenses, pagination);
    } catch (err) {
        return API_RESPONSE.apiFailure(req, res, err.message, 500);
    }

}

exports.getExpense = async (req, res, next) => {
    const expId = req.params.expId;
    try {
        const expData = await Expense.findOne({ _id: expId, user_id: req.user._id }, "title price description tag date").lean();

        if (!expData) {
            return API_RESPONSE.apiFailure(req, res, "Expense not found", 404);
        }


        expData.date = getSysDateFormat(expData.date);

        const data = {
            ...expData
        }
        console.log(data);

        return API_RESPONSE.apiSuccess(req, res, "Details found", expData);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        return API_RESPONSE.apiFailure(req, res, err.message, err.statusCode);
    }
}

exports.getMonthlyReport = async (req, res, next) => {

    let query = { user_id: req.user._id };
    try {
        const result = await Expense.aggregate([
            { $match: query },
            {
                $group: {
                    _id: {
                        $concat: [
                            { $dateToString: { format: "%Y-%m", date: "$date" } },
                            "-",
                            { $toString: { $literal: 1 } }
                        ]
                    },
                    total: { $sum: '$price' } // Compute sum of price for each group
                }
            },
            {
                $project: {
                    _id: 0, // Exclude the default _id field
                    month_year: '$_id',
                    total: 1 // Include total in the output
                }
            },
            {
                $sort: { year: 1, month: 1 } // Optionally sort results by year and month
            }
        ]).exec();

        return API_RESPONSE.apiSuccess(req, res, "data fetched successfully", result);
    } catch (err) {
        return API_RESPONSE.apiFailure(req, res, err.message, 500);
    }


}

exports.deleteExpense = async (req, res, next) => {
    const expId = req.params.expId;
    try {
        const expData = await Expense.findOneAndDelete({ _id: expId, user_id: req.user._id });
        if (!expData) {
            return API_RESPONSE.apiFailure(req, res, "Expense not found", 404);
        }
        return API_RESPONSE.apiSuccess(req, res, "Expense deleted successfully");
    } catch (err) {
        console.log({ err })
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        return API_RESPONSE.apiFailure(req, res, err.message, err.statusCode);
    }

}