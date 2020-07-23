const { Router } = require('express')

const routes = Router()

const authorization = require('./middlewares/auth')

const AuthController = require('./controllers/AuthController')
const ProjectController = require('./controllers/ProjectController')

routes.post('/register', AuthController.signUp)
routes.get('/authenticate', AuthController.signIn)
routes.post('/recover_pass', authorization, AuthController.passRecover)
routes.post('/reset_pass', AuthController.passReset)
routes.get('/users', ProjectController.show)
routes.get('/user/:id', ProjectController.showUser)

module.exports = routes
