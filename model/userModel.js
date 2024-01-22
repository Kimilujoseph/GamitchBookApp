const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
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
    favourite: [
        {
            type: mongoose.Schema.Types.String,
            ref: 'books'
        }
    ],
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'commentCollection'
        }
    ]

})


const userModel = mongoose.model('usersCollection', userSchema);

module.exports = userModel;
