const routes = require('express').Router()
const genreByAdmin = require('../controllers/genre')

routes.get('/', genreByAdmin.listGenre)
routes.get('/:id', genreByAdmin.DetailGenre)
routes.post('/', genreByAdmin.PostGenreByAdmin)
routes.put('/:id', genreByAdmin.PutGenreByAdmin)
routes.patch('/:id', genreByAdmin.PatchGenreByAdmin)
routes.delete('/:id', genreByAdmin.DeleteGenreByAdmin)

module.exports = routes
