const routes = require('express').Router()
const cinemasController = require('../controllers/cinemas')

routes.get('/', cinemasController.listLocationCinema)
routes.post('/', cinemasController.listCinemaByLocation)

module.exports = routes
