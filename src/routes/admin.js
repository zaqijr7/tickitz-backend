const routes = require('express').Router()
const moviesController = require('../controllers/movies')

routes.get('/', moviesController.getMoviesByAdmin)
routes.put('/:id', moviesController.putMovieByAdmin)
routes.patch('/:id', moviesController.patchMovieByAdmin)
routes.delete('/:id', moviesController.deleteMovieByAdmin)
routes.get('/:id', moviesController.detailMovieByAdmin)
routes.post('/', moviesController.postMovieByAdmin)

module.exports = routes
