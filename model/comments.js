const mongoose = require('mongoose');

const comments = new mongoose.Schema({
    comment: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'books'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin'
    },
    date:{
        type:Date,
        required:true,
        default:Date.now,
    }
})

comments.index({userId:"text"})
const commentModel = mongoose.model('commentCollection', comments);

module.exports = commentModel;