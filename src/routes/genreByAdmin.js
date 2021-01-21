const routes = require('express').Router()
const genreByAdmin = require('../controllers/genre')

routes.post('/', genreByAdmin.createGenre)
routes.get('/:id', genreByAdmin.getDetailGenre)
routes.get('/', genreByAdmin.listAllGenre)
routes.delete('/:id', genreByAdmin.deleteGenre)
routes.patch('/:id', genreByAdmin.updateGenre)

module.exports = routes
