const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    date: {
        type: String,
        default: Date.now
    }
})

const emailmodel = mongoose.model('emails', emailSchema);

module.exports = emailmodel;