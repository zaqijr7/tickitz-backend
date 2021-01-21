const routes = require('express').Router()
const cinemasController = require('../controllers/cinemas')

routes.get('/', cinemasController.listAllCinema)
routes.get('/:id', cinemasController.getDetailCinema)

module.exports = routes
