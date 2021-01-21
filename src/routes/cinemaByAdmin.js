const routes = require('express').Router()
const cinemasController = require('../controllers/cinemas')

routes.post('/', cinemasController.createCinema)
routes.get('/', cinemasController.listAllCinema)
routes.get('/:id', cinemasController.getDetailCinema)
routes.delete('/:id', cinemasController.deleteMovie)
routes.patch('/:id', cinemasController.updateCinema)

module.exports = routes
