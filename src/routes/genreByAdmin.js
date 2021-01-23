const routes = require('express').Router()
const genreByAdmin = require('../controllers/genre')
const authMiddleware = require('../middlewares/auth')

routes.post('/', authMiddleware.authCheck, authMiddleware.adminPermissions, genreByAdmin.createGenre)
routes.get('/:id', authMiddleware.authCheck, authMiddleware.adminPermissions, genreByAdmin.getDetailGenre)
routes.get('/', authMiddleware.authCheck, authMiddleware.adminPermissions, genreByAdmin.listAllGenre)
routes.delete('/:id', authMiddleware.authCheck, authMiddleware.adminPermissions, genreByAdmin.deleteGenre)
routes.patch('/:id', authMiddleware.authCheck, authMiddleware.adminPermissions, genreByAdmin.updateGenre)

module.exports = routes
