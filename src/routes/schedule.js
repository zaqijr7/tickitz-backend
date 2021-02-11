const routes = require('express').Router()
const showTimeCinemaController = require('../controllers/showTimeCinema')

routes.post('/', showTimeCinemaController.scheduleCinema)
routes.get('/', showTimeCinemaController.getScheduleByCondition)

module.exports = routes
