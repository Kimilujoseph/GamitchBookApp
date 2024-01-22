require('../model/database');
const userSchema = require('../model/userModel')
const { userSignIn } = require('../utils/validation');
const bcrypt = require('bcryptjs');

exports.userRegister = async function (req, res) {
    res.render('signin', { title: "signin" });
}


exports.userSignin = async function (req, res) {
    try {
        const { error } = userSignIn(req.body);
        if (error) return res.json(error.details[0].message)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const userData = {
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        }

        const insertedUser = await userSchema.insertMany(userData);
        res.json(insertedUser)
    }
    catch (err) {
        console.log(err.message)
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
        const user = req.query.username;
        const favouriteBook = req.query._id;
        await userSchema.updateOne({ username: user }, { $push: { favourite: favouriteBook } })
        res.json("Added");
    }
    catch (error) {
        console.log(error)
    }
}

exports.userLogin = async function (req, res) {
    try {
        const userAuth = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        }

        //check if user exists
        const userExist = await userSchema.find({ "username": userAuth.username });
        if (userExist) {
            const verifyUser = await bcrypt.compare(req.body.password, userExist.password)
            if (!verifyUser) return res.json('user or password is not correct');
            res.json('User Verified')
        }
        else {
            res.json('username does not exist')
        }
    }
    catch (error) {
        console.log(error)
    }
}