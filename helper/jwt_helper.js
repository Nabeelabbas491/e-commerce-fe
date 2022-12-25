const jwt = require("jsonwebtoken")
const { HTTP_STATUS_CODE } = require("../utils/messege")
require("dotenv")

exports.signAccessTokem = (userEmail) => {
    return new Promise((resolve,reject) => {
     const secret = process.env.JWT_SECRET_KEY
     jwt.sign({userEmail},secret, (err,token)=>{
        if(err){
            return reject("Token generation failed.")
        }else{
            resolve(token)
        }
    })
    })
}

exports.verifyAccessToken = async (req,res,next) =>{ 
    try{
        const headers = req.headers['authorization'].split(" ")
        const bearerToken = headers[1]
        const verifyToken = await jwt.verify(bearerToken, process.env.JWT_SECRET_KEY)
        console.log("verify Token..", verifyToken)
        if(verifyToken){
            next()
        }
    }catch(err){
        res.status(HTTP_STATUS_CODE.UNAUTHORIZED).send("Your are unauthorized to perform this request")
    }
}