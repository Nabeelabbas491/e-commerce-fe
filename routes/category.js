const express = require("express")
const Router = express.Router()
const categoryController = require("../controllers/categoryController")


Router.route("/:id")
.get(categoryController.getById)
.delete(categoryController.deleteCategory)
.put(categoryController.updateCategory)

Router.get('/', categoryController.getAllCetgories)
Router.post('/create', categoryController.createCategory)

module.exports = Router

