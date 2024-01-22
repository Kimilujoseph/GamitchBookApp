const express = require('express')
const route = require('./routes/bookroute')
const userRoute = require('./routes/userroute')
const expresslayout = require('express-ejs-layouts')
const fileupload = require('express-fileupload')
const session = require('express-session')
const flash = require('connect-flash')
const cookieparser = require('cookie-parser')
const dotenv = require('dotenv')
const app = express();
const port = process.env.PORT || 4500;
dotenv.config()
//used to parse the req.body
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//use of the static files
app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(expresslayout);

//use session and flush messages
app.use(cookieparser('BookBlogSecure'));
app.use(session({
    secret: 'bookblogsecretSession',
    saveUninitialized: true,
    resave: true
}))
app.use(flash())
app.use(fileupload())

//settingup the ejs engine

app.set('view engine', 'ejs');
app.set('layout', './layouts/main')
app.use(route)
app.use(userRoute)

app.listen(port, () => console.log(`The server is listening on port ${port}`))