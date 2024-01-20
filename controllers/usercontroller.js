require('../model/database');
const user = require('../model/user ')
const { userSignIn } = require('../utils/validation');

exports.userSignin = async function (req, res) {
    res.render('signin', { title: "signin" });
}


exports.userSignin = async function (req, res) {
    try {
        const { error } = userSignIn(req.body);
        if (error) return res.sendStatus(error.details[0].messagee)
        const userData = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        }
        const insertedUser = await user.insertMany(userData);
        res.json(insertedUser);

    }
    catch (error) {

    }
}