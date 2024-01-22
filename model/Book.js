const mongoose = require('mongoose'); // Importing the mongoose 

// Declaring the schema of books model
var bookSchema = new mongoose.Schema({
    nameofthebook: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    imageofthebook: {
        type: String,
        required: true,
        unique: true,
    },
    publisher: {
        type: String,
        required: true,
    },
    publishingdate: {
        type: Date,
        required: true,
        default: Date.now,
    },
    aboutthebook: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    review: {
        type: String,
        required: true,
    },
    cost: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'authors',
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'commentCollection',
        }
    ]

});
bookSchema.index({ nameofthebook: 'text', genre: 'text' })

//Export the model
module.exports = mongoose.model('books', bookSchema); 