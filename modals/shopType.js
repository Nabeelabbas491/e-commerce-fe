const mongoose = require('mongoose')
// var uniqueValidator = require('mongoose-unique-validator');

const shopTypeSchema = mongoose.Schema({
    user : {
        type : mongoose.Types.ObjectId,
        ref : 'User',
        required : true
    },
    shopType : {
        type: String,
        unique : true,
        trim : true,
        required : 'Shop type is required'
    },
},
{
    timestamps:true,
    createdAt:"created_at",
    updatedAT:"updated-at"
})

// shopTypeSchema.plugin(uniqueValidator);
const ShopType  = mongoose.model('ShopType', shopTypeSchema)

ShopType.init().then(()=>{})

module.exports = { ShopType }