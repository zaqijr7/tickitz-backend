const routes = require('express').Router()
const authController = require('../controllers/auth')
const profileController = require('../controllers/profile')

const { validationInputRegister, validationInput } = require('../middlewares/validationInput')

routes.post('/', validationInputRegister, validationInput, authController.login)
routes.get('/:email', profileController.sendMailWeb)

module.exports = routes
