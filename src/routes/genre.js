const routes = require('express').Router()
const genreController = require('../controllers/genre')

routes.get('/', genreController.listAllGenre)
routes.get('/:id', genreController.getDetailGenre)

module.exports = routes
