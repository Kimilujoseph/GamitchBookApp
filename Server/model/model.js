const mongoose = require('mongoose')

const databaseSchema = new mongoose.Schema({
    Nameofthecategory: {
        type:String
      },
      Image: {
        type:String
      },
      Books: {
        type:Array
      }
})


module.exports = mongoose.model("Categories",databaseSchema);