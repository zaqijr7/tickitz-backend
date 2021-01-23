const routes = require('express').Router()
const authController = require('../controllers/auth')

routes.post('/', authController.login)

module.exports = routes
