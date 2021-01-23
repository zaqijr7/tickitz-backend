const routes = require('express').Router()
const signUpController = require('../controllers/auth')

routes.post('/', signUpController.registerAdmin)

module.exports = routes
