const { Router } = require("express")
const User = require("./models/User")

const routes = Router()

const AuthController = require("./controllers/AuthController")

routes.post("/register", AuthController.signUp)

module.exports = routes
