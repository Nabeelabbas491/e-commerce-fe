
const { Product } = require("../modals/product")
const cloudinary = require("../helper/cloudinary")
const { HTTP_STATUS_CODE } = require("../utils/messege")
const { productValidator } = require("../helper/validations")
const mongoose = require("mongoose")

exports.save = async (req, res, next) => {
    try{
        const productValidtor = await productValidator.validateAsync(req.body)
        let result = await Product.create(req.body)
        console.log("result", result)
        res.status(HTTP_STATUS_CODE.CREATED).json({
            status : "success",
            data : result
        })
    }catch(e){
      if(e.isJoi){
        const errorMsg = e.details[0].message.replace(`\"${e.details[0].context.key}\"`,e.details[0].context.key)
        const product = req.body
        product.images.forEach(async (img)=>{
           await cloudinary.uploader.destroy(img.public_id)
        })
        res.status(HTTP_STATUS_CODE.BAD_REQUEST).send(errorMsg)
      }else{
        res.status(HTTP_STATUS_CODE.INTERNAL_SERVER).send(e)
      }
    }
}

exports.uploadImage = (req, res, next) => {
    try{
        cloudinary.uploader.upload(req.files.file.tempFilePath, { folder:"product_images"}, (err, result)=>{  
            if(result){
                res.status(HTTP_STATUS_CODE.OK).send(result)
            }else{
                res.status(HTTP_STATUS_CODE.BAD_REQUEST).send(err.message)
            }
        })
    }catch(e){
        if(e.code){
            res.status(e.code).send(e.message)
        }else{
            res.status(HTTP_STATUS_CODE.INTERNAL_SERVER).send(e)
        }
    }
}

exports.deleteImage = async (req,res, next)=>{
    try{
        console.log("req...", req.params.id)
        // Todo --> change
        let deletedImg = await cloudinary.uploader.destroy('product_images/'+req.params.id)
        if(deletedImg.result == 'ok'){
            res.status(HTTP_STATUS_CODE.DELETE_SUCCESS).sned('Image deleted successfully')
        }else if(deletedImg.result == 'not found'){
            const error = new Error('Image not found')
            error.code = HTTP_STATUS_CODE.BAD_REQUEST
            throw error
        }
    }catch(e){
        if(e.code){
            res.status(e.code).send(e.message)
        }else{
            res.status(HTTP_STATUS_CODE.INTERNAL_SERVER).send(e)
        }
    }
}

exports.getProducts = async (req, res, next) =>{
    try{
        const products = await Product.find().populate("categpry").populate("shopType")
        if(products){
            res.status(HTTP_STATUS_CODE.OK).json({
                status : "success",
                data : products
            })
        }
    }catch(e){}
}

exports.getById = async (req,res,next) =>{
    try{
        const validId = mongoose.Types.ObjectId.isValid(req.params.id)
        if(!validId){
          const error = new Error(`${req.params.id} is not a valid mongo Id.`)
          error.code = HTTP_STATUS_CODE.BAD_REQUEST
          throw error
        }
        const result = await Product.findById(req.params.id)
        if(result){
            res.status(HTTP_STATUS_CODE.OK).json({
                status: "success",
                data : result
            })
        }
    }catch(e){
        if(e.code){
            res.status(e.code).send(e.message)
        }else{
            res.status(HTTP_STATUS_CODE.BAD_REQUEST).send("No such Product exist")
        }
    }
}

exports.delete = async (req, res, next) => {
    try{
    const validId = mongoose.Types.ObjectId.isValid(req.params.id);
    if(!validId){
        const error = new Error(`${req.params.id} is not a valid Id`)
        error.code = HTTP_STATUS_CODE.BAD_REQUEST
        throw error
    }
    const product = await Product.findById(req.params.id)
      if(product){
        product.images.forEach( async (img) => {
            const deletedImg = await cloudinary.uploader.destroy(img.public_id)
        })
        const result = await Product.findByIdAndDelete(req.params.id)
        res.status(HTTP_STATUS_CODE.DELETE_SUCCESS).send("Product deleted successfully!")
      }else{
        const error = new Error(`Product with id:${req.params.id} does not exist`)
        error.code = HTTP_STATUS_CODE.BAD_REQUEST
        throw error
      }
    }catch(e){
        console.log("error...", error)
        if(e.code){
            res.status(e.code).send(e.message)
        }else{
            res.status(500).send(e)
        }
    }
}


