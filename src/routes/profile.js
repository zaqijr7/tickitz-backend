const routes = require('express').Router()
const profileController = require('../controllers/profile')
const authMiddleware = require('../middlewares/auth')
const { validationInputProfile, validationInput } = require('../middlewares/validationInput')

routes.put('/', authMiddleware.authCheck,
  authMiddleware.usersPermissions,
  validationInputProfile,
  validationInput,
  profileController.updateProfile)

routes.patch('/',
  authMiddleware.authCheck,
  authMiddleware.usersPermissions,
  profileController.updatePhoto
)

routes.get('/', authMiddleware.authCheck, authMiddleware.usersPermissions, profileController.getUsers)
routes.delete('/', authMiddleware.authCheck, authMiddleware.usersPermissions, profileController.deletePhoto)
// routes.patch('/:id', authMiddleware.authCheck, authMiddleware.usersPermissions, profileController.updateProfile)

module.exports = routes
