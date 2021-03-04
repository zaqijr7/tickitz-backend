const profileModel = require('../models/profile')
const userModel = require('../models/users')
const responseStatus = require('../helpers/responseStatus')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const upload = require('../helpers/uploads').single('photo')
const multer = require('multer')
const { APP_KEY, APP_URL, IP_URL_DEVICE, APP_PORT } = process.env

exports.updateProfile = async (req, res) => {
  const idUser = req.userData.id
  const profile = req.body
  console.log(profile)
  const data = {
    firstName: profile.firstName,
    lastName: profile.lastName,
    phoneNumber: profile.phoneNumber
  }
  try {
    const results = await profileModel.updateProfile(idUser, data)
    console.log(results)
    if (profile.password !== '') {
      const salt = await bcrypt.genSalt()
      const encryptedPassword = await bcrypt.hash(profile.password, salt)
      await userModel.updatePassword(idUser, encryptedPassword)
    }
    if (profile.email !== '') {
      await userModel.updateEmail(idUser, profile.email)
    }
    if (results.affectedRows > 0) {
      const data = await profileModel.getProfileByIdUserJoin(idUser)
      const dataFinnally = {
        id: data[0].id,
        firstName: data[0].firstName,
        lastName: data[0].lastName,
        email: data[0].email,
        phoneNumber: data[0].phoneNumber,
        photo: `${IP_URL_DEVICE}${APP_PORT}/${data[0].photo}`
      }

      if (data.length > 0) {
        return res.json({
          success: true,
          message: 'Profile updated successfully',
          results: dataFinnally
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
  const { id } = req.query
  try {
    const data = await userModel.getUsersProfileById(id)
    const dataFinnally = {
      id: data[0].id,
      firstName: data[0].firstName,
      lastName: data[0].lastName,
      email: data[0].email,
      phoneNumber: data[0].phoneNumber,
      photo: `${IP_URL_DEVICE}${APP_PORT}/${data[0].photo}`
    }
    return res.status(200).json({
      success: true,
      message: 'User Match',
      results: dataFinnally
    })
  } catch (err) {
    return res.status(404).json({
      success: true,
      message: 'User not exist'
    })
  }
}

exports.updatePhoto = async (req, res) => {
  upload(req, res, async err => {
    const { id } = req.userData
    console.log(id, '<<<<< ini id users')
    if (err instanceof multer.MulterError) {
      responseStatus.errorUploadPoster(res)
    } else if (err) {
      responseStatus.errorUploadPoster(res)
    }
    try {
      const finallyData = {
        id: id,
        photo: `${req.file.destination}/${req.file.filename}` || null
      }
      const result = await profileModel.updatePhotoProfile(finallyData)
      console.log(result)
      res.status(200).json({
        success: true,
        message: 'Update photo profile successfully'
      })
    } catch (err) {
      res.status(400).json({
        success: false,
        message: "File Can't be Empty"
      })
    }
  })
}

exports.deletePhoto = async (req, res) => {
  const data = req.body
  const { id } = req.userData
  const dataFinnally = {
    id: id,
    photo: `${data.photo}`
  }
  console.log(data, '<<< ini data')
  try {
    const result = await profileModel.updatePhotoProfile(dataFinnally)
    console.log(result)
    res.status(200).json({
      success: true,
      message: 'Delete photo profile successfully'
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server Error'
    })
  }
}
