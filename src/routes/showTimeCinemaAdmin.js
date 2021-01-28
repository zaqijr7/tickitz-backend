const routes = require('express').Router()
const showTimeCinemaController = require('../controllers/showTimeCinema')
const authMiddleware = require('../middlewares/auth')

routes.post('/', authMiddleware.authCheck, authMiddleware.adminPermissions, showTimeCinemaController.createShowTimeCinema)
// routes.get('/', authMiddleware.authCheck, authMiddleware.adminPermissions, sTimeController.listShowTime)
// routes.patch('/:id', authMiddleware.authCheck, authMiddleware.adminPermissions, sTimeController.updateShowTime)
// routes.delete('/:id', authMiddleware.authCheck, authMiddleware.adminPermissions, sTimeController.deleteShowTime)

module.exports = routes
