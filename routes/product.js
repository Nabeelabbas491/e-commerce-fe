const express = require("express")
const Router = express.Router()
const productController = require("../controllers/productController")


Router.route('/:id').get().put().delete()

Router.post("/", productController.save)

module.exports = Router 