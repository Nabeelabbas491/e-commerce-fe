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

const productValidatpr = Joi.object({
    
})



module.exports = { authValidor }


