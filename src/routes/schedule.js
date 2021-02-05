const routes = require('express').Router()
const showTimeCinemaController = require('../controllers/showTimeCinema')

routes.post('/', showTimeCinemaController.scheduleCinema)

module.exports = routes
