const Joi = require("joi");

const authValidor = Joi.object({
    name : Joi.string().required(),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(8).max(30).required(),
    phone : Joi.string().empty(''),
    avatar : Joi.string().allow('', null),            // just for info , use empty('') for consistency
    address : Joi.string().empty(),           
    postalCode : Joi.string().empty(''),
    token : Joi.string().empty('')
})

const productValidator = Joi.object({
    productName : Joi.string().required(),
    productDescription : Joi.any(),
    color :Joi.any(),
    size :Joi.any(),
    images : Joi.array().min(1).max(10).required(),
    price : Joi.string().required(),
    categpry : Joi.string().required(),
    shopType : Joi.string().required(),
    quantity : Joi.number().required(),
    weight : Joi.any()
})

module.exports = { authValidor }
// module.exports = { productValidator }


