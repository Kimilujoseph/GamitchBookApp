const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    preference: {
        type: Array
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'commentCollection'
        }
    ]

})


const model = mongoose.model('usersCollections', userSchema);
module.exports = model;