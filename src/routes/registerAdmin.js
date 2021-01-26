const routes = require('express').Router()
const signUpController = require('../controllers/auth')
const { validationInputRegister, validationInput } = require('../middlewares/validationInput')

routes.post('/', validationInputRegister, validationInput, signUpController.registerAdmin)

module.exports = routes
