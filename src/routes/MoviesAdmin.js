const routes = require('express').Router()
const moviesAdminController = require('../controllers/movies')

// routes.put('/:id', moviesController.putMovieByAdmin)
routes.patch('/:id', moviesAdminController.updateMoviee)
routes.delete('/:id', moviesAdminController.deleteMovie)
// routes.get('/:id', moviesController.detailMovieByAdmin)
routes.get('/', moviesAdminController.listMovies)
routes.post('/', moviesAdminController.createMovie)
routes.get('/:id', moviesAdminController.getDetailMovieById)

module.exports = routes
