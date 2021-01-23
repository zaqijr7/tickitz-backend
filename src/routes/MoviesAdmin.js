const routes = require('express').Router()
const moviesAdminController = require('../controllers/movies')
const authMiddleware = require('../middlewares/auth')

routes.patch('/:id', authMiddleware.authCheck, authMiddleware.adminPermissions, moviesAdminController.updateMoviee)
routes.delete('/:id', authMiddleware.authCheck, authMiddleware.adminPermissions, moviesAdminController.deleteMovie)
routes.get('/', authMiddleware.authCheck, authMiddleware.adminPermissions, moviesAdminController.listMovies)
routes.post('/', authMiddleware.authCheck, authMiddleware.adminPermissions, moviesAdminController.createMovie)
routes.get('/:id', authMiddleware.authCheck, authMiddleware.adminPermissions, moviesAdminController.getDetailMovieById)

module.exports = routes
