const jwt = require("jsonwebtoken")
require('dotenv').config()

module.exports = function auth(req,res, next){

    const token = req.header("Authorization")
    if(!token) return res.status(401).send("Access denied")

    try{
    const decode = jwt.verify(token , process.env.SECRET_KEY)
    req.userData = decode
    next()
    }
    catch(er){
        return res.status(400).send("token is invalid")
    }


}