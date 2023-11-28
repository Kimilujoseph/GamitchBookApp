const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    Nameofthebook: {
        type: 'String',
        //require:true
      },

    Image:{
        type:'String',
        //require:true
    },
      Author: {
        type: 'Array',
        //require:true
      },
      Publisher: {
        type:'String',
        //require:true
      },
      PublishingDate: {
        type:"Date",
        //require:true
      },
      Description: {
        type:'String',
        //require:true
      },
      Rating: {
        type:"String"
      },
      Categories_NameoftheCategory: {
        type: 'String',
        //require:true
      },
      Review:{
        type:'String',
      },
      Cost:{
        type:'String',
        //required:true
      }
    })

module.exports = mongoose.model('BookCollections2',productSchema);

