const { User } = require("../modals/userModel");
const { authValidor } = require("../helper/validations")
const { HTTP_STATUS_CODE } = require("../utils/messege");
const jwt_helper = require("../helper/jwt_helper")
const bcrypt = require("bcrypt")

exports.register = async (req,res,next) => {
    try{
        const validatedUser = await authValidor.validateAsync(req.body)

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
    }catch(e){
        if(e.isJoi){
            const errorMsg = e.details[0].message.replace(`\"${e.details[0].context.key}\"`,e.details[0].context.key)
            res.status(HTTP_STATUS_CODE.BAD_REQUEST).send(errorMsg)
        }else{
            console.log("error", e)
            res.status(400).send(e)
        }
    }
}

exports.login = async (req,res, next)=> {
    try{
        const email = req.body.email.toLowerCase()
        // console.log("email///", email)
        const user = await User.findOne({ email : email })
          console.log("user..", user)
        if(!user) throw "Email does not exist"

        const passwordMatch = await bcrypt.compare(req.body.password, user.password)

        if(passwordMatch){
           const result = await User.findOne({ email : email}, { password : 0})
           res.status(200).send({
           status : 'success',
           data :  result
           })
        }else throw 'Password is incorrect'
    }catch(e){
        console.log("error..", e)
        res.status(HTTP_STATUS_CODE.FORBIDDEN).send(e)
    }
}

