const { ShopType } = require('../modals/shopType')
const {HTTP_STATUS_CODE} = require("../utils/messege")
const requiredShopTypes = ['638c98d99d497bb917cad030', '638c96b246e13b634c8a544f']

exports.getAll = async (req,res,next) => {
    try{
    const result = await ShopType.find()
        res.status(HTTP_STATUS_CODE.OK).json({
            status : "success",
            data : result
        })
    }catch(error){
        console.log("error", error)
    }
}

exports.getById = async (req,res,next) => {
    try{
        console.log("id...", req.params.id)
        const result = await ShopType.findById(req.params.id)
        console.log("result...", result)
        res.status(HTTP_STATUS_CODE.ok).json({
            status : "sucess",
            data : result
        })
    }catch(error){
        res.status(HTTP_STATUS_CODE.BAD_REQUEST).send("Shop type does not exist")
    }
}

exports.save = async (req,res, next) => {
    try{
        console.log("req",req.body)

        // let isShopTypeExist = ShopType./

        let result = await ShopType.create(req.body)
        console.log("result..", result)
        if(result){
            res.status(HTTP_STATUS_CODE.CREATED).json({
                status : "success",
                data : result
            })
        }
    }catch(error){
        console.log("error", error)
        res.status(HTTP_STATUS_CODE.CONFLICT).send(`${req.body.shopType} already exist`)
    }
} 

exports.update = async (req,res,next) => {
    try{
        if(requiredShopTypes.includes(req.params.id))
        {
            res.status(HTTP_STATUS_CODE.FORBIDDEN).send("You are not allowed to perform this action.")
        }else{
            console.log("further...")
            const result = await ShopType.findByIdAndUpdate(req.params.id,{...req.body}, { new:true })
            res.status(HTTP_STATUS_CODE.CREATED).send({
             status : "sucesss",
             data : result
            })
        }
        }catch(error){
        console.log("error", error)
        res.status(HTTP_STATUS_CODE.BAD_REQUEST).send("Shop type not found")
    }
}

exports.delete =  async (req,res,next) => {
    try{
        if(requiredShopTypes.includes(req.params.id))
        {
            res.status(HTTP_STATUS_CODE.FORBIDDEN).send("You are not allowed to perform this action.")
        }else{
            console.log("further...")
            const result = await ShopType.findByIdAndDelete(req.params.id)
            res.status(HTTP_STATUS_CODE.DELETE_SUCCESS).json({
                status : "success",
                data : null
            })
        }
    }catch(error){
        console.log("error", error)
        res.status(HTTP_STATUS_CODE.BAD_REQUEST).send("Shop type not found")
    }
}