require('dotenv').config()
const jwt = require('jsonwebtoken')
const userSchema = require('../model/userModel')
const verifyToken = async (req, res, next) => {
    const token = req.cookies.jwtToken;
    console.log("token", token)
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

    if (userToken) {
        try {
            jwt.verify(userToken, process.env.USER_SECRET_TOKEN, async (error, decoded) => {
                if (error) {
                    if (error.name === "TokenExpiredError") {
                        req.verifyRefreshToken = true;
                        if (req.verifyRefreshToken && req.cookies.refresh_token) {
                            await verifyUser.Refresh_Token(req, res, next)
                        }
                    }
                }
                else {
                    req.user = decoded;
                    next()
                }
            });


        } catch (error) {
            console.error("token creation", error)
        }
    } else {
        res.status(401).send('Please log in');
    }
};

verifyUser.Refresh_Token = async (req, res, next) => {
    const refreshToken = req.cookies.refresh_token;

    if (refreshToken) {
        try {
            const verifyUser = jwt.verify(refreshToken, process.env.REFRESH_TOKEN);

            if (!verifyUser) {
                res.status(403).send("Refresh token has expired");
            } else {
                const user = await userSchema.findById(verifyUser._id);
                console.log(user)

                if (!user || user.refreshToken !== refreshToken) {
                    res.status(403).send("Refresh token tampered");
                } else {
                    const Access_Token = jwt.sign({ _id: user._id }, process.env.USER_SECRET_TOKEN, { expiresIn: '1m' });
                    req.userAccessToken = Access_Token;
                    console.log("UserRefresh", Access_Token)
                    req.shouldRefreshToken = true;
                    next();
                }
            }
        } catch (error) {
            console.error(error);
            req.shouldRefreshToken = false;
            res.status(401).send("Please login to verify account");
        }
    } else {
        res.status(401).send("please login to verify the user");
    }
};

module.exports = verifyUser;

module.exports.verifyToken = verifyToken;
module.exports.verifyUser = verifyUser;