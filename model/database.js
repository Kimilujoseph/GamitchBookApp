require('dotenv').config()
const mongoose = require('mongoose');
require("../model/Author")
require("../model/Book")
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
   console.log('Connected to MongoDB');
});


