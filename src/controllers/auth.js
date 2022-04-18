const userModel = require('../models/users')
const profileModel = require('../models/profile')
const responseStatus = require('../helpers/responseStatus')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { APP_KEY } = process.env

exports.login = async (req, res) => {
  const { email, password } = req.body
  try {
    const existingUser = await userModel.getUsersByConditionAsync({ email })
    if (existingUser.length > 0) {
      const compare = await bcrypt.compare(password, existingUser[0].password)
      if (compare) {
        const id = existingUser[0].id
        const role = existingUser[0].role
        const token = jwt.sign({ id, role: role }, APP_KEY)
        return res.status(200).send({
          success: true,
          message: 'Login Successfully',
          results: {
            email: existingUser[0].email,
            token
          }
        })
      }
    }
    return res.status(404).send({
      success: false,
      message: 'Email or Password is Wrong'
    })
  } catch (error) {
    console.log(error, '<<<< INI ERROR')
    return res.status(500).send({
      success: false,
      message: responseStatus.serverError(res)
    })
  }
}

exports.register = async (req, res) => {
  const { email, password } = req.body
  const role = 'USER'
  try {
    const emailExist = await userModel.getUsersByConditionAsync({ email })
    if (emailExist.length > 0) {
      return responseStatus.emailIsExist(res)
    }
    const salt = await bcrypt.genSalt()
    const encryptedPassword = await bcrypt.hash(password, salt)
    const createUser = await userModel.createUserAsync({ email, password: encryptedPassword, role: role })
    await profileModel.createProfile({ id_user: createUser.insertId })
    if (createUser.affectedRows > 0) {
      const result = await userModel.getUserById(createUser.insertId)
      const dataUser = {
        email: result[0].email
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
  const { email, password } = req.body
  const role = 'ADMIN'
  try {
    const emailExist = await userModel.getUsersByConditionAsync({ email })
    if (emailExist.length > 0) {
      return responseStatus.emailIsExist(res)
    }
    const salt = await bcrypt.genSalt()
    const encryptedPassword = await bcrypt.hash(password, salt)
    const createUser = await userModel.createUserAsync({ email, password: encryptedPassword, role: role })
    await profileModel.createProfile({ id_user: createUser.insertId })
    if (createUser.affectedRows > 0) {
      const result = await userModel.getUserById(createUser.insertId)
      const dataUser = {
        name: result[0].name,
        email: result[0].email
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
