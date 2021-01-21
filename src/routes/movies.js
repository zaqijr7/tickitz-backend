const routes = require('express').Router()
const moviesController = require('../controllers/movies')

routes.get('/', moviesController.listMovies)
// routes.get('/admin/movies', moviesController.getMoviesByAdmin)
routes.get('/:id', moviesController.getDetailMovieById)

module.exports = routes
