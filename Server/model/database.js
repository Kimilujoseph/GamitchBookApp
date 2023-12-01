require('../model/model')
require('../model/model2')
const mongoose = require('mongoose');

const connect = async function(){
    try {
        mongoose.set("strictQuery", true);
        await mongoose.connect('mongodb+srv://timothyjoseph8580:Dyu19LAvvVMq6scC@cluster0.68ufuyn.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true });
        console.log("Connected to MongoDB Atlas");
      } catch (error) {
        console.log("You're offline");
        process.exit(1);
      }
    await mongoose.connect('mongodb+srv://timothyjoseph8580:Dyu19LAvvVMq6scC@cluster0.68ufuyn.mongodb.net/?retryWrites=true&w=majority')
    const connected = mongoose.connection;
    connected.on('error',()=>console.log("The server is not connected"));
}


connect()
