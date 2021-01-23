const routes = require('express').Router()
const seatController = require('../controllers/seats')
const authMiddleware = require('../middlewares/auth')

routes.post('/', authMiddleware.authCheck, authMiddleware.adminPermissions, seatController.createSeat)
routes.get('/', authMiddleware.authCheck, authMiddleware.adminPermissions, seatController.listSeats)
routes.get('/:id', authMiddleware.authCheck, authMiddleware.adminPermissions, seatController.getSeatById)
routes.patch('/:id', authMiddleware.authCheck, authMiddleware.adminPermissions, seatController.updateSeat)
routes.delete('/:id', authMiddleware.authCheck, authMiddleware.adminPermissions, seatController.deleteSeat)

module.exports = routes
