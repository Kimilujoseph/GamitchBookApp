const express = require('express');
const  app  = express();
const route = require('./Server/serverkroute/bookrouter')
const expresslayout = require('express-ejs-layouts');
const port  = process.env.PORT||4000;
// using static files

app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(expresslayout)

//setting ejs templates

app.set('layout','./layouts/main')
app.set('view engine','ejs')

//importing the route
app.use(route)




app.listen(port,()=>console.log(`The port is listening inn port ${port}`));
