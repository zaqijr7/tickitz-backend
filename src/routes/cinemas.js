const routes = require('express').Router()
const cinemasController = require('../controllers/cinemas')

routes.get('/', cinemasController.ListCinemas)
routes.get('/:id', cinemasController.DetailCinema)

module.exports = routes
