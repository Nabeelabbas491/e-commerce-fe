const jwt = require("jsonwebtoken")
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