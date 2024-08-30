const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'Active',
        enum: {
            values: ['Active', 'InActive'],
            message: '{VALUE} is not supported'
        },
    }
});

module.exports = mongoose.model('User', userSchema);
