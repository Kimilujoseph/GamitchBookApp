require('dotenv').config()
const mongoose = require('mongoose');
require("../model/Author")
require("../model/Book")

async function run() {
   try {
      await mongoose.connect(process.env.CONNECT_MONGO)
      console.log('The database is connected')
   }
   catch (error) {
      console.log(error)
   }
}
run()

