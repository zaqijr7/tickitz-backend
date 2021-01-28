const routes = require('express').Router()
const profileController = require('../controllers/profile')

routes.post('/', profileController.forgotPassword)

module.exports = routes
