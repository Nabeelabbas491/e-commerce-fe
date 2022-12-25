const { number } = require('joi')
const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    productName : {
        type : String,
        required : true
    },
    productDescription: {
        type:String,
        default : null
    },
    color : [{
        type:String,
        default : null
    }],
    size : [{
       type : String,
    //    enum : ['xs','sm', "md", "lg", "xl", 'xxl', 'xxxl' ]
    }],
    images : [{
    //     type : Buffer,            // fileType ...  GridFS is used if file size exceeds 16MB below 16MB use Buffer  
    //     re[quired : true
    type : Object,
    required: true
    }],
    price : {
        type : String,
        required : true
    },
    categpry : {
        type : mongoose.Types.ObjectId,
        ref : "Category",
        required : true
    },
    shopType: {
        type : mongoose.Types.ObjectId,
        ref : "ShopType",
        required : true
    },
    quantity:{
        type : Number,
        required : true
    },
    weight : {
        type : String,
        default : null
    }
},{
    timestamps : true,
    createAt : "created_at",
    updatedAt : "updated_at"
})

const Product = mongoose.model("Product", productSchema)

Product.init().then(()=>{})

module.exports = { Product }