const jwt = require('jsonwebtoken')
const userModel = require('../models/users')
const { APP_KEY } = process.env

exports.authCheck = (req, res, next) => {
  try {
    const { authorization } = req.headers
    if (authorization && authorization.startsWith('Bearer')) {
      const token = authorization.substring(7)
      const data = jwt.verify(token, APP_KEY)
      if (data) {
        req.userData = data
        return next()
      }
    }
    return res.status(401).json({
      success: false,
      message: 'Authorization needed'
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'There something is wrong'
    })
  }
}

exports.adminPermissions = async (req, res, next) => {
  const data = req.userData
  try {
    const checkRole = await userModel.getUsersByConditionAsync({ id: data.id })
    if (checkRole[0].role === 'ADMIN') {
      return next()
    } else {
      return res.status(403).json({
        status: false,
        message: 'Access Forbidden'
      })
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'There something is wrong'
    })
  }
}
