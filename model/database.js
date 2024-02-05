require('dotenv').config()
const mongoose = require('mongoose');
require("../model/Author")
require("../model/Book")


const connect = async function () {
   try {
      mongoose.set("strictQuery", true);
      await mongoose.connect(process.env.MONGODB_URI);
      console.log("Connected to MongoDB Atlas");
   } catch (error) {
      console.log("It seems you are offline");
      process.exit(1);
   }
}

connect()