const { User } = require("../modals/userModel");
const { authValidor } = require("../helper/validations")
const { HTTP_STATUS_CODE } = require("../utils/messege");
const jwt_helper = require("../helper/jwt_helper")
const bcrypt = require("bcrypt")
const nodemailer = require('../helper/nodemailer')

exports.register = async (req,res,next) => {
    try{
        console.log("sswaa", authValidor)
        const validatedUser = await authValidor.validateAsync(req.body)
          console.log("validated User", validatedUser)
        const isEmailExist = await User.findOne({ email:validatedUser.email })
        if(isEmailExist) throw "Email already exist, Please register with a new email"

        const token =  await jwt_helper.signAccessTokem(validatedUser.email)
        const passwordHashed = await bcrypt.hash(validatedUser.password,10)    //          1 - 12 rounds , 10 normally use

        const result = await User.create({...validatedUser, password:passwordHashed, token : token})
        const user = await User.findOne({ _id:result._id }, {password:0})  
    
        res.status(HTTP_STATUS_CODE.OK).json({
           status: "success",
           data: user,
         });
         await nodemailer.sendEmai()
    }catch(e){
        if(e.isJoi){
            const errorMsg = e.details[0].message.replace(`\"${e.details[0].context.key}\"`,e.details[0].context.key)
            res.status(HTTP_STATUS_CODE.BAD_REQUEST).send(errorMsg)
        }else{
            console.log("error", e)
            if(e.Joi){
                console.log("JOI error", )
            }
            res.status(400).send(e)
        }
    }
}

exports.login = async (req,res, next)=> {
    try{
        const email = req.body.email.toLowerCase()

        const user = await User.findOne({ email : email })
          console.log("user..", user)
        if(!user) {
            const error = new Error('Email does not exist')
            error.code = 401
            throw error
        }
        
        const passwordMatch = await bcrypt.compare(req.body.password, user.password)

        if(passwordMatch){
           const result = await User.findOne({ email : email}, { password : 0})
           res.status(200).send({
           status : 'success',
           data :  result
           })
        }else{
            const error = new Error('Password is incorrect')
            error.code = HTTP_STATUS_CODE.FORBIDDEN
            throw error
         }
    }catch(e){
        console.log("error..", e.message)
        res.status(e.code).send(e.message)
    }
}

