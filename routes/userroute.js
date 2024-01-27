require('dotenv').config();
const userRoute = require('express').Router();
const usercontroller = require('../controllers/usercontroller')
const { verifyUser } = require('../middleware/authorization')

userRoute.get('/user/register', usercontroller.userRegister);
userRoute.post('/user/signin', usercontroller.userSignin);
userRoute.get('/user/preference', verifyUser, usercontroller.preference)
userRoute.post('/user/userLogin', usercontroller.userLogin)
userRoute.get('/user/userDashboard', verifyUser, usercontroller.userDashboard);
userRoute.post('/user/userRegister/submit', usercontroller.userSignin)
userRoute.post('/user/userLogin/Login', usercontroller.userLogin)
userRoute.get('/user/userregister', usercontroller.userRegister)
userRoute.get('/user/userlogin', usercontroller.userLoginPage);
//userRoute.post('/user/userlogin/refreshtoken', usercontroller.refreshToken);
//route.post('/user/preference/:id', usercontroller.preference)


module.exports = userRoute;  