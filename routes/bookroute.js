// The role of the routes file in Express.js is to define the routing of my application. In other words, 
//it tells the server how to respond to different client requests based on the endpoint and the HTTP request method.
require('dotenv').config()
const express = require('express')
const { verifyToken } = require('../middleware/authorization')
const route = express.Router()
const bookcontroller = require('../controllers/index');

route.get('/', bookcontroller.homepage);
route.get('/author/:_id', bookcontroller.authorpage);
route.get('/books/:_id', bookcontroller.bookpage);
route.get('/genre/:genre', bookcontroller.genre);
route.get('/random', bookcontroller.random)
route.get('/signinemail', bookcontroller.emailpage)
route.get('/registerAdmin', bookcontroller.registerAdmin)
route.post('/search', bookcontroller.searchpage);
route.get('/submit', verifyToken, bookcontroller.submitpage);
route.post('/submitbook', bookcontroller.addNew)
route.post('/submitemail', bookcontroller.addEmail)
route.post('/registerAdmin', bookcontroller.addAdmin)
route.get('/loginAdminPage', bookcontroller.loginAdminPage)
route.post('/loginAdmin', bookcontroller.loginAdmin)
route.post('/postcomment/:bookId', verifyToken, bookcontroller.postComment)


module.exports = route;