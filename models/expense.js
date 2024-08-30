const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const tagSchema = new Schema({
    name: String
});

const expenseSchema = new Schema({
    title: {
        type: String,
        require: true,
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    tag: [tagSchema],
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Expense", expenseSchema);
