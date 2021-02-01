const profileModel = require('../models/profile')
const userModel = require('../models/users')
const responseStatus = require('../helpers/responseStatus')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { APP_KEY, APP_URL, APP_PORT } = process.env

exports.updateProfile = async (req, res) => {
  const idUser = req.userData.id
  console.log(idUser)
  const profile = req.body
  const data = {
    firstName: profile.firstName,
    lastName: profile.lastName,
    phoneNumber: profile.phoneNumber
  }
  try {
    const results = await profileModel.updateProfile(idUser, data)
    console.log(results)
    if (profile.password) {
      const salt = await bcrypt.genSalt()
      const encryptedPassword = await bcrypt.hash(profile.password, salt)
      await userModel.updatePassword(idUser, encryptedPassword)
    }
    if (profile.email) {
      await userModel.updateEmail(idUser, profile.email)
    }
    if (results.affectedRows > 0) {
      const finalResult = await profileModel.getProfileByIdUserJoin(idUser)

      if (finalResult.length > 0) {
        return res.json({
          success: true,
          message: 'Profile create successfully',
          results: finalResult[0]
        })
      } else {
        return res.status(400).json({
          success: false,
          message: 'Failed to Create Profile'
        })
      }
    }
  } catch (error) {
    responseStatus.serverError(res)
  }
}

exports.forgotPassword = async (req, res) => {
  const { email } = req.body
  const emailIsExist = await userModel.getUsersByConditionAsync({ email })
  if (emailIsExist.length < 1) {
    return res.status(404).json({
      success: false,
      message: 'Email not exist'
    })
  }
  const token = jwt.sign({ email }, APP_KEY)
  const urlReset = `${APP_URL}${APP_PORT}/forgot/?t=${token}`
  console.log(urlReset)
  return res.status(200).json({
    success: true,
    message: 'Token sent successfully '
  })
}

exports.getUsers = async (req, res) => {
  const email = req.body
  try {
    const data = await userModel.getUsersByConditionAsync(email)
    console.log(data.length)
    const dataFinally = {
      id: data[0].id,
      email: data[0].email,
      role: data[0].role
    }

    return res.status(200).json({
      success: true,
      message: 'User Match',
      results: dataFinally
    })
  } catch (err) {
    return res.status(404).json({
      success: true,
      message: 'User not exist'
    })
  }
}
