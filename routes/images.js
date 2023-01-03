const express = require("express")
const Router = express.Router()
const productController = require("../controllers/productController")

Router.get("/:id",productController.getImage)
Router.delete("/",productController.deleteImage)
Router.post("/", productController.uploadImage)

module.exports = Router

