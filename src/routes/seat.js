const routes = require('express').Router()
const seatController = require('../controllers/seats')

routes.get('/', seatController.listSoldSeat)

module.exports = routes
