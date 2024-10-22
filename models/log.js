const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const logSchema = new Schema({
    headers: {
        type: Object,
    },
    api_code: {
        type: String,
    },
    request: {
        type: Object
    },
    response: {
        type: Object
    },
    process_time: {
        type: String // store in milliseconds
    }
});

module.exports = mongoose.model("Log", logSchema);