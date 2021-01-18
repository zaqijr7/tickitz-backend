const routes = require('express').Router()
const cinemasController = require('../controllers/cinemas')

routes.get('/', cinemasController.getCinemasByAdmin)
routes.get('/:id', cinemasController.DetailCinemaByAdmin)
routes.post('/', cinemasController.PostCinemaByAdmin)
routes.put('/:id', cinemasController.PutCinemaByAdmin)
routes.patch('/:id', cinemasController.patchCinemaByAdmin)
routes.delete('/:id', cinemasController.deleteCinemaByAdmin)

module.exports = routes
