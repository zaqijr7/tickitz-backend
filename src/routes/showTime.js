const routes = require('express').Router()
const sTimeController = require('../controllers/ShowTime')

routes.get('/:id', sTimeController.getShowTimeById)

module.exports = routes
