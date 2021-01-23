const userModel = require('../models/users')
const responseStatus = require('../helpers/responseStatus')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { APP_KEY } = process.env

exports.login = async (req, res) => {
  const { username, password } = req.body
  try {
    const existingUser = await userModel.getUsersByConditionAsync({ username })
    if (existingUser.length > 0) {
      const compare = await bcrypt.compare(password, existingUser[0].password)
      if (compare) {
        const id = existingUser[0].id
        const role = existingUser[0].role
        const token = jwt.sign({ id, role: role }, APP_KEY)
        return res.status(200).json({
          success: true,
          message: 'Login Successfully',
          token
        })
      }
    }
    return res.status(401).json({
      success: false,
      message: 'Login Failed'
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: responseStatus.serverError(res)
    })
  }
}

exports.register = async (req, res) => {
  const { name, username, password } = req.body
  const role = 'USER'
  try {
    const usernameExist = await userModel.getUsersByConditionAsync({ username })
    if (usernameExist.length > 0) {
      return responseStatus.usernameIsExist(res)
    }
    const salt = await bcrypt.genSalt()
    const encryptedPassword = await bcrypt.hash(password, salt)
    const createUser = await userModel.createUserAsync({ name, username, password: encryptedPassword, role: role })
    if (createUser.affectedRows > 0) {
      const result = await userModel.getUserById(createUser.insertId)
      const dataUser = {
        name: result[0].name,
        username: result[0].username
      }
      return res.status(200).json({
        success: true,
        message: 'Register Successfully',
        result: dataUser
      })
    }
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: 'Please try again leter'
    })
  }
}

exports.registerAdmin = async (req, res) => {
  const { name, username, password } = req.body
  const role = 'ADMIN'
  try {
    const usernameExist = await userModel.getUsersByConditionAsync({ username })
    if (usernameExist.length > 0) {
      return responseStatus.usernameIsExist(res)
    }
    const salt = await bcrypt.genSalt()
    const encryptedPassword = await bcrypt.hash(password, salt)
    const createUser = await userModel.createUserAsync({ name, username, password: encryptedPassword, role: role })
    if (createUser.affectedRows > 0) {
      const result = await userModel.getUserById(createUser.insertId)
      const dataUser = {
        name: result[0].name,
        username: result[0].username
      }
      return res.status(200).json({
        success: true,
        message: 'Register Successfully',
        result: dataUser
      })
    }
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: 'Please try again leter'
    })
  }
}
