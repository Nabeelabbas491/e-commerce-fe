const express = require('express')
const Router = express.Router()
const authController = require("../controllers/authController")

Router.post("/register", authController.register)
Router.post("/login", authController.login)
Router.post("/forgot", authController.forgotPassword)
Router.post("/reset-password", authController.resetPassword)
// Router.get("/", authController.getAllUsers)

module.exports = Router