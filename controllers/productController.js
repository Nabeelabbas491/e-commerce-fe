
const { Product } = require("../modals/product")
const cloudinary = require("../helper/cloudinary")
const { HTTP_STATUS_CODE } = require("../utils/messege")
const validations = require("../helper/validations")
const mongoose = require("mongoose")

exports.save = async (req, res, next) => {
    try{
        if(req.body.id) {
            update(req,res,next) 
            return;
        }
        await validations.productValidator.validateAsync(req.body)
        let result = await Product.create(req.body)
        res.status(HTTP_STATUS_CODE.CREATED).json({
            status : "success",
            data : result
        })
    }catch(e){
        const product = req.body
        product.images.forEach(async (img)=>{
           await cloudinary.uploader.destroy(img.public_id)
        })
       if(e.isJoi){
        const errorMsg = e.details[0].message.replace(`\"${e.details[0].context.key}\"`,e.details[0].context.key)
        res.status(HTTP_STATUS_CODE.BAD_REQUEST).send(errorMsg)
       }else{
        res.status(HTTP_STATUS_CODE.INTERNAL_SERVER).send(e)
       }
    }
}

update = async (req,res,next) => {
    try{
       await validations.productValidator.validateAsync(req.body)
       const product = await Product.findById(req.body.id)
       const oldImageIds = Array.from(product.images, ({ public_id })=> public_id)
       const updatedImageIds = Array.from(req.body.images, ({ public_id })=> public_id)
       const removedImageIds = oldImageIds.filter((id) => !updatedImageIds.includes(id) )
       removedImageIds.forEach(async (id)=>{
        await cloudinary.uploader.destroy(id)
       })
       const result = await Product.findByIdAndUpdate(req.body.id, {...req.body}, {new:true})
       if(result){
        res.status(HTTP_STATUS_CODE.OK).json({
            status : "success",
            data : result
        })
       }
    }catch(e){
        const product =  await Product.findById(req.body.id)
        const oldImageIds = Array.from(product.images, ({ public_id })=> public_id)
        const updatedImageIds = Array.from(req.body.images, ({ public_id })=> public_id)
        const removedImageIds = updatedImageIds.filter((id) => !oldImageIds.includes(id) )
        removedImageIds.forEach(async (id)=>{
            await cloudinary.uploader.destroy(id)
        })
        if(e.isJoi){
            const errorMsg = e.details[0].message.replace(`\"${e.details[0].context.key}\"`,e.details[0].context.key)
        res.status(HTTP_STATUS_CODE.BAD_REQUEST).send(errorMsg)
        }
        else{
            res.status(HTTP_STATUS_CODE.INTERNAL_SERVER).send(e)
        }
    }
}

exports.uploadImage = async (req, res, next) => {
    try{
        if(!req.files.file.length) req.files.file = [req.files.file]
        if(req.files.file.length) {
            const productImages = []
            for(let file of req.files.file){
                let cloudinaryImage = await  cloudinary.uploader.upload(file.tempFilePath, { folder:"product_images"})
                productImages.push(cloudinaryImage)
            }  
            res.status(HTTP_STATUS_CODE.OK).json({
                status: "success",
                data : productImages
            })  
        }else{
            const error = new Error("Atleast one image is required")
            error.code = HTTP_STATUS_CODE.BAD_REQUEST
            throw error
        }
    }catch(e){
        if(e && e.code){
            res.status(e.code).send(e.message)
        }
        else{
            res.status(HTTP_STATUS_CODE.INTERNAL_SERVER).send(e)
        }
    }
}

exports.deleteImage = async (req,res, next)=>{
    try{
        const product = await Product.findById(req.query.productId)
        if(product){
            const deletedImg = await cloudinary.uploader.destroy(req.query.publicId)
            if(deletedImg.result == 'ok'){
                const imageIndex = product.images.findIndex(el => el.public_id === req.query.publicId)
                product.images.splice(imageIndex,1)
                await Product.findByIdAndUpdate(req.query.productId, {...product})
                res.status(HTTP_STATUS_CODE.OK).json({
                    status:"success",
                    message:"Image deleted successfully and product information updated"
                })
            }else if(deletedImg.result == 'not found'){
                const error = new Error('Image not found')
                error.code = HTTP_STATUS_CODE.BAD_REQUEST
                throw error
            }
        }else{
            const error = new Error("Product does not exist")
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
        }else{
            const error = new Error("Product does not exist")
            error.code = HTTP_STATUS_CODE.BAD_REQUEST
            throw error
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
        console.log("error product...", e)
        if(e.code){
            res.status(e.code).send(e.message)
        }else{
            res.status(500).send(e)
        }
    }
}

// for testing purpose only
exports.getImage = async (req,res, next) => {
    try{
        cloudinary.uploader.explicit("product_images/"+req.params.id, options = { type : 'upload'}, (err,result)=>{
        if(err){
            res.status(HTTP_STATUS_CODE.NOT_FOUND).send(err)
        }else{
            res.status(HTTP_STATUS_CODE.OK).send(result)
        }
        })
    }catch(e){}
}


// https://cloudinary.com/documentation/image_upload_api_reference

// ****************  use like this

    // Cloudinary::Uploader.explicit(public_id, options = {}) 
    
    // const imgExist =  await cloudinary.uploader.explicit('product_images/lgpnvc0xxs6hgzkvoj2ddd', options = { type : 'upload'})  // one way use this
    // cloudinary.uploader.explicit('product_images/lgpnvc0xxs6hgzkvoj2d', options = { type : 'upload'}, (err,result)=>{            // second way
    // console.log("result...", result)
    // console.log("err", err)
    // })

// Cloudinary::Uploader.rename(from_public_id, to_public_id, options = {})
// url = Cloudinary::Utils.download_backedup_asset(asset_id, version_id)
// Cloudinary::Uploader.remove_all_context(public_ids, options = {})


