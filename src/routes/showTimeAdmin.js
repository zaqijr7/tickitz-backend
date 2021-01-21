const routes = require('express').Router()
const sTimeController = require('../controllers/ShowTime')

routes.post('/', sTimeController.createShowTime)
routes.get('/', sTimeController.listShowTime)
routes.patch('/:id', sTimeController.updateShowTime)
routes.delete('/:id', sTimeController.deleteShowTime)

module.exports = routes
