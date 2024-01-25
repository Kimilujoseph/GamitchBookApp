require('dotenv').config()
const jwt = require('jsonwebtoken')
const userSchema = require('../model/userModel')
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
                if (error.name === "TokenExpiredError") {
                    req.verifyRefreshToken = true;
                    next()
                }
                else {
                    return res.status(403).send('Token Tampered');
                }
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
};

/**
* @description verifies the user's refresh token and returns an access token
* @param {Object} req - the request object
* @param {Object} res - the response object
*/
verifyUser.Refresh_Token = async function (req, res) {
    const refreshToken = req.cookies.refresh_token;
    console.log(refreshToken);
    if (refreshToken) {
        try {
            const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN);
            if (!decoded) {
                return res.status(403).send("token tampered");
            }
            const user = await userSchema.findById(decoded._id);
            if (!user || user.refreshToken) {
                return res.status(403).send("token tampered");
            }

            const Access_Token = jwt.sign({ _id: user._id }, process.env.USER_SECRET_TOKEN, { expiresIn: '15m' });

            res.cookie('userToken', Access_Token,
                {
                    httpOnly: true,
                    sameSite: 'strict'
                })
        } catch (error) {
            console.log("Refresh token:", error)
            res.json('Error  refreshing token')
        }
    }
    else {
        res.json("Refresh token not found")
    }
};


module.exports.verifyToken = verifyToken;
module.exports.verifyUser = verifyUser;