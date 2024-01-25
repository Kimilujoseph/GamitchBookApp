require('dotenv').config()
const jwt = require('jsonwebtoken')

const verifyToken = async (req, res, next) => {
    const token = req.cookies.jwtToken;
    console.log(token)
    if (token) {
        jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, (error, decoded) => {
            if (error) {
                return res.status(401).send('Wrong Token');
            } else {
                req.user = decoded;
                next()
            }
        })
    }
    else {
        res.status(401).send("please login")
    }
}

const verifyUser = async (req, res, next) => {
    const userToken = req.cookies.userToken;
    console.log(userToken);
    if (userToken) {
        jwt.verify(userToken, process.env.USER_SECRET_TOKEN, (error, decoded) => {
            if (error) {
                return res.status(403).send('Token Tampered');
            }
            else {
                req.user = decoded;
                next()
            }
        })
    }
    else {
        res.status(401).send('please  login')
    }
}


module.exports.verifyToken = verifyToken;
module.exports.verifyUser = verifyUser;