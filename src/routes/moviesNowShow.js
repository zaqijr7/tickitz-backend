const routes = require('express').Router()
const moviesController = require('../controllers/movies')

routes.get('/', moviesController.listMoviesNowShow)
// routes.get('/:id', moviesController.getDetailMovieById)
// routes.get('/admin/movies', moviesController.getMoviesByAdmin)

module.exports = routes
