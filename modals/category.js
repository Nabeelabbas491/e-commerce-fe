const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
name : {
    type: String,
    unique : true,
    required : 'Category name is required'
},
},
{
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
})

const Category = mongoose.model('Category', categorySchema)

module.exports = { Category }