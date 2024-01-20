const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    }
})

const emailmodel = mongoose.model('emails', emailSchema);

module.exports = emailmodel;