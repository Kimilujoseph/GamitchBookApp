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

    refreshToken: {
        type: String,
        required: false,
    },

    userFavourite: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'books',
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
