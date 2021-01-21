const routes = require('express').Router()
const transactionController = require('../controllers/transaction')

routes.post('/', transactionController.createTransaction)

module.exports = routes
