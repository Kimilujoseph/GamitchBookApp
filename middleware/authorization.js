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



module.exports = verifyToken;