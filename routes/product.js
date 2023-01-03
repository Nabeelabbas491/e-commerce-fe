const express = require("express")
const Router = express.Router()
const productController = require("../controllers/productController")
const {verifyAccessToken} = require("../helper/jwt_helper")

Router.route('/:id')
.get(productController.getById)
.delete(productController.delete)

Router.get("/", productController.getProducts)
Router.post("/", verifyAccessToken, productController.save) 

module.exports = Router 