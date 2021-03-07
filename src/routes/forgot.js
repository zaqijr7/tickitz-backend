const routes = require('express').Router()
const profileController = require('../controllers/profile')
const { validationInputRegister, validationInput } = require('../middlewares/validationInput')

routes.get('/', profileController.sendMail)
routes.post('/', profileController.forgotPassword)
routes.patch('/', validationInputRegister, validationInput, profileController.resetPassword)

module.exports = routes
