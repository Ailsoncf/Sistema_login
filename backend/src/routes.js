const { Router } = require('express')

const routes = Router()

const authorization = require('./middlewares/auth')

const AuthController = require('./controllers/AuthController')
const ProjectController = require('./controllers/ProjectController')

routes.post('/register', AuthController.signUp)
routes.use('/', authorization)
routes.post('/authenticate', AuthController.signIn)
routes.post('/forgot_pass', AuthController.passrec)
routes.post('/reset_pass', AuthController.passreset)
routes.get('/users', ProjectController.show)

module.exports = routes
