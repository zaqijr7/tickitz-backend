const routes = require('express').Router()
const transactionController = require('../controllers/transaction')
const authMiddleware = require('../middlewares/auth')

routes.post('/', authMiddleware.authCheck, authMiddleware.usersPermissions, transactionController.createTransaction)

module.exports = routes
