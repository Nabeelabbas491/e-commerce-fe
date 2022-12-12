const { Category } =  require("../modals/category")
const { HTTP_STATUS_CODE } = require("../utils/messege")

exports.createCategory = async (req, res, next) => {
    try{
        const result = await Category.create(req.body)
       if(result){
        res.status(HTTP_STATUS_CODE.CREATED).json({
            status : "sucess",
            response : result
        })
       }
    }catch(error){
        res.status(HTTP_STATUS_CODE.CONFLICT).send(`${error.keyValue.name} already exits`)
    }
}

exports.getAllCetgories = async (req, res, next) => {
    try{
        const result = await Category.find()
        if(result){
            res.status(HTTP_STATUS_CODE.OK).json({
                status : "success", 
                response : result
            })
        }
    }catch(error){
        // res.status(400).send(error)
    }
}

exports.getById = async (req, res, next) => {
    try{
        console.log("req id", req.params.id)
       const result = await Category.findById(req.params.id)
        res.status(HTTP_STATUS_CODE.OK).json({
            status : "success",
            data : result
        })
    }catch(error){
        console.log("error", error)
        res.status(HTTP_STATUS_CODE.BAD_REQUEST).send("Category not found")
    }
}

exports.deleteCategory = async (req,res,next) => {
   try{
    const result = await Category.findByIdAndDelete(req.params.id)
    if(result){
        res.status(HTTP_STATUS_CODE.DELETE_SUCCESS).json({
            status: "success",
            response : null
        })
    }else{
        res.status(HTTP_STATUS_CODE.BAD_REQUEST).send("Category not found")
    }
   }catch(error){
    // res.status(400).send(error)
   }
}

exports.updateCategory = async (req,res,next)=>{
    try{
        const result = await Category.findByIdAndUpdate( req.params.id,  { ...req.body }, { new:true } )
        console.log("result..", result)
        if(result){
            res.status(HTTP_STATUS_CODE.OK).json({
                status:"success",
                response:result
            })
        }else{
            res.status(HTTP_STATUS_CODE.BAD_REQUEST).send("Category not found")
        }
    }catch(error){}
}

