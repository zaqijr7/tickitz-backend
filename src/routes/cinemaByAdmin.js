const routes = require('express').Router()
const cinemasController = require('../controllers/cinemas')
const authMiddleware = require('../middlewares/auth')

routes.post('/', authMiddleware.authCheck, authMiddleware.adminPermissions, cinemasController.createCinema)
routes.get('/', authMiddleware.authCheck, authMiddleware.adminPermissions, cinemasController.listAllCinema)
routes.get('/:id', authMiddleware.authCheck, authMiddleware.adminPermissions, cinemasController.getDetailCinema)
routes.delete('/:id', authMiddleware.authCheck, authMiddleware.adminPermissions, cinemasController.deleteMovie)
routes.patch('/:id', authMiddleware.authCheck, authMiddleware.adminPermissions, cinemasController.updateCinema)

module.exports = routes
