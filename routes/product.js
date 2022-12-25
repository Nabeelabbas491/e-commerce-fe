const express = require("express")
const Router = express.Router()
const productController = require("../controllers/productController")
const {verifyAccessToken} = require("../helper/jwt_helper")

Router.route('/:id')
.get(productController.getById)
.put()
.delete(productController.delete)

Router.post("/", verifyAccessToken, productController.save)
Router.post("/image", verifyAccessToken, productController.uploadImage)
Router.delete("/image/:id", verifyAccessToken, productController.deleteImage)
Router.get("/", productController.getProducts)

module.exports = Router 