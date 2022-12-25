const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    productName : {
        type : String,
        required : true
    },
    productDescription: {
        type:String
    },
    color : {
        type:String
    },
    size : {
       type : String,
       enum : ['sm', "md", "lg", "xl", 'xxl', 'xxxl' ]
    },
    images : [{
        type : Buffer,            // fileType ...  GridFS is used if file size exceeds 16MB below 16MB use Buffer  
        required : true
    }],
    price : {
        type : String,
        required : true
    },
    categpry : {
        type : mongoose.Types.ObjectId,
        required : true
    },
    shopType: {
        type : mongoose.Types.ObjectId,
        required : true
    }
},{
    timestamps : true,
    createAt : "created_at",
    updatedAt : "updated_at"
})

const Product = mongoose.model("Product", productSchema)

Product.init().then(()=>{})

exports.module = { Product }