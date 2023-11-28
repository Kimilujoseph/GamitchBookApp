const mongoose = require('mongoose');

const connect = async function(){
    await mongoose.connect('mongodb://localhost:27017/BlogDB')
    const connected = mongoose.connection;
    connected.on('error',()=>console.log("The server is not connected"));
}


connect()

require('../model/model')
require('../model/model2')