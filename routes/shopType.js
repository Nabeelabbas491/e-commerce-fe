const express = require('express')
const Router = express.Router()
const shopTypeController = require("../controllers/shopTypeController")

Router.route("/:id")
.get(shopTypeController.getById)
.patch(shopTypeController.update)
.delete(shopTypeController.delete)

Router.get("/", shopTypeController.getAll)
Router.post('/', shopTypeController.save)

module.exports = Router