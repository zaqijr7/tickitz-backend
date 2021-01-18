const routes = require('express').Router()
const moviesController = require('../controllers/movies')

routes.get('/:name', moviesController.ListMoviesByGenre)

module.exports = routes
