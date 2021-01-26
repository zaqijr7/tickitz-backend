const routes = require('express').Router()
const authController = require('../controllers/auth')
const { validationInputRegister, validationInput } = require('../middlewares/validationInput')

routes.post('/', validationInputRegister, validationInput, authController.login)

module.exports = routes
