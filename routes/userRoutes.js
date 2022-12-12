const express = require('express')
const Router = express.Router()
const authController = require("../controllers/authController")

Router.post("/register", authController.register)
Router.post("/login", authController.login)
// Router.get("/", authController.getAllUsers)

module.exports = Router