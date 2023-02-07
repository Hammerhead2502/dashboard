const { verify } = require("jsonwebtoken")
require('dotenv').config()

//Middleware to check if token exist, if it does, send decoded ID to next()
const userCookie = (req,res,next) => {
    const token= req.cookies.token
    if(token){
        verify(token, process.env.SESSION_KEY, (err, decodedToken) => {
            if(err){
                req.token={tokenExist: err}
                next()
            }
            else{
                req.token={tokenExist: decodedToken}
                next()
            }
        })
    }
    next()
}

module.exports = userCookie