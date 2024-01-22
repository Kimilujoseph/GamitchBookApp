require('dotenv').config();
const userRoute = require('express').Router();
const usercontroller = require('../controllers/usercontroller')

userRoute.get('/user/register', usercontroller.userRegister);
userRoute.post('/user/signin', usercontroller.userSignin);
userRoute.post('/user/preference', usercontroller.preference)
userRoute.post('/user/userLogin', usercontroller.userLogin)
//route.post('/user/preference/:id', usercontroller.preference)


module.exports = userRoute; 