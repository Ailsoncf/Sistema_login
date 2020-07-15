const { Router } = require('express')

const routes = Router()

const AuthController = require('./controllers/AuthController')

routes.post('/register', AuthController.signUp)
routes.post('/authenticate', AuthController.signIn)

module.exports = routes
