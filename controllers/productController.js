
const { Product } = require("../modals/product")

const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: "dipk7cq9q",
    api_key: "469111635744138",
    api_secret: "6pu3nsZRz6z_QiY8QLc6MG21KoY"
  });

exports.save = (req, res, next) => {
    try{
        console.log("product req..", req.files.file)
        cloudinary.uploader.upload(req.files.file.tempFilePath, (err, result)=>{
            console.log("image..result..", result)
        },(err)=>{
            console.log("err of image", err)
        })
    }catch(error){
        console.log("error..",error)
    }
}