const routes = require('express').Router()
const signUpController = require('../controllers/auth')

routes.post('/', signUpController.register)

module.exports = routes
