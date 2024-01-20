const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the author model
var authorSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    },
    twitter:{
        type:String,
    },
    facebook:{
        type:String,
    },
    instagram:{
        type:String,
    },
    linkedn:{
        type:String,
        unique:true,
    },
    biography:{
        type:String,
        required:true,
        max:2000,
    },
    awards:{
        type:String,
    },
    authorquotes:{
        type:String,
        max:50,
    },
    image:{
        type:String,
        required:true,
        unique:true,
    },
    //books: [{ type: mongoose.Schema.Types.nameofthebook, ref: 'Book' }],
    
});

//Export the model
module.exports = mongoose.model('authors', authorSchema);