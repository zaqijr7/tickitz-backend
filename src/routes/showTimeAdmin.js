const routes = require('express').Router()
const sTimeController = require('../controllers/ShowTime')
const authMiddleware = require('../middlewares/auth')

routes.post('/', authMiddleware.authCheck, authMiddleware.adminPermissions, sTimeController.createShowTime)
routes.get('/', authMiddleware.authCheck, authMiddleware.adminPermissions, sTimeController.listShowTime)
routes.patch('/:id', authMiddleware.authCheck, authMiddleware.adminPermissions, sTimeController.updateShowTime)
routes.delete('/:id', authMiddleware.authCheck, authMiddleware.adminPermissions, sTimeController.deleteShowTime)

module.exports = routes
