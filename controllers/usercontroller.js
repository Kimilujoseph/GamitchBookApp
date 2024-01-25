require('dotenv').config()
require('../model/database');
const userSchema = require('../model/userModel')
const { userSignIn } = require('../utils/validation')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

exports.userRegister = async function (req, res) {
    try {
        const infoError = req.flash('infoErrorObj')
        res.render('userRegister', { title: "signin", infoError });
    }
    catch (error) {
        console.log(error)
    }
}


exports.userSignin = async function (req, res) {
    try {

        const { error } = userSignIn(req.body);
        if (error) {
            req.flash('infoErrorObj', error.details[0].message);
            res.redirect('/user/userregister')
            return
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const userData = {
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        }

        await userSchema.insertMany(userData);
        req.flash('successObj', 'successfully signed in');
        res.redirect('/user/userlogin')

    }
    catch (err) {
        res.sendStatus(500)
        console.error(err.message)
    }
}

exports.userLoginPage = async function (req, res) {
    try {
        const successObj = req.flash('successObj')
        const infoError = req.flash('infoErrorObj')
        res.render('userlogin', { title: 'userlogin', successObj, infoError });
    }
    catch (error) {
        res.sendStatus(500)

    }
}

exports.userPage = async function (req, res) {
    try {
        res.render('userpage', { title: "userpage" })

    }
    catch (error) {
        res.status(500);
    }
}

exports.preference = async function (req, res) {
    try {
        const user = req.user;
        const favouriteBook = req.query._id;
        if (!user) {
            return res.status(401).send("user not authenicated to add favourite")
        }

        // Check if the book is already in the user's favourites
        const userFavourites = await userSchema.findById(user).select('userFavourite');
        const isBookInFavourites = userFavourites.userFavourite.includes(favouriteBook);

        if (!isBookInFavourites) {
            // Add the book to the user's favourites if it's not already there
            const updatedUser = await userSchema.findByIdAndUpdate(
                user,
                { $push: { userFavourite: favouriteBook } },
                { new: true }
            );
            res.json(updatedUser);
        } else {
            res.status(400).send('Book is already in your favourites');
        }
    } catch (error) {
        console.log(error);
    }
};

/**
 * @description handles user login requests
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.userLogin = async function (req, res) {
    try {
        const userAuth = {
            username: req.body.username,
            password: req.body.password
        }

        //check if user exists
        const userExist = await userSchema.findOne({ "username": userAuth.username });
        if (!userExist) {
            req.flash('infoErrorObj', 'user does not exist');
            res.redirect('/user/userLogin')
            return
        }
        else {
            const verifyUser = await bcrypt.compare(req.body.password, userExist.password)
            if (!verifyUser) {
                req.flash('infoErrorObj', 'user or password is  not correct');
                res.redirect('/user/userLogin')
                return
            }


            const Access_Token = jwt.sign({ _id: userExist._id }, process.env.USER_SECRET_TOKEN, { expiresIn: '30s' });
            const Refresh_Token = jwt.sign({ _id: userExist._id }, process.env.REFRESH_TOKEN, { expiresIn: '15m' })
            await userSchema.findByIdAndUpdate(
                userExist._id,
                { refreshToken: Refresh_Token },
                { new: true }
            );
            //res.json(Access_Token);
            res.cookie('userToken', Access_Token, {
                httpOnly: true,
                sameSite: 'strict',
            });

            res.cookie('refresh_token', Refresh_Token, {
                httpOnly: true,
                sameSite: 'strict'
            })

            res.redirect('user/userDashboard');

        }
    }
    catch (error) {
        console.log(error)
    }
}


exports.userDashboard = async (req, res) => {
    res.render("userpage", { title: "userpage" })
    //res.json("User accessed");
}             