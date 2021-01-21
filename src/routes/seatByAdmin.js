const routes = require('express').Router()
const seatController = require('../controllers/seats')

routes.post('/', seatController.createSeat)
routes.get('/', seatController.listSeats)
routes.patch('/:id', seatController.updateSeat)
routes.delete('/:id', seatController.deleteSeat)

module.exports = routes
