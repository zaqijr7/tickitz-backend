const routes = require('express').Router()
const profileController = require('../controllers/profile')
const authMiddleware = require('../middlewares/auth')
const { validationInputProfile, validationInput } = require('../middlewares/validationInput')

routes.put('/', authMiddleware.authCheck,
  authMiddleware.usersPermissions,
  validationInputProfile,
  validationInput,
  profileController.updateProfile)

routes.get('/', profileController.getUsers)
// routes.patch('/:id', authMiddleware.authCheck, authMiddleware.usersPermissions, profileController.updateProfile)

module.exports = routes
