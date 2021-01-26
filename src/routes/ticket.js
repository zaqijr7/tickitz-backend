const routes = require('express').Router()
const transactionController = require('../controllers/transaction')
const authMiddleware = require('../middlewares/auth')

routes.get('/', authMiddleware.authCheck, authMiddleware.usersPermissions, transactionController.listTicketsByIdUser)
module.exports = routes
