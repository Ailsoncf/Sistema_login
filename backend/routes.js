const { Router } = require('express')

const routes = Router()

const AuthController = require('./controllers/AuthController')

routes.post('/register', AuthController.signUp)
routes.get('/register', AuthController.signIn)

module.exports = routes
