const profileModel = require('../models/profile')
const userModel = require('../models/users')
const responseStatus = require('../helpers/responseStatus')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const upload = require('../helpers/uploads').single('photo')
const multer = require('multer')
const { sendEmail } = require('../helpers/sendMailMobile')
const { APP_KEY, APP_URL, IP_URL_DEVICE, APP_PORT, DOMAIN_FRONTEND_WEB } = process.env

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
      let photo
      if (data[0].photo === 'UNDEFINED') {
        photo = 'UNDEFINED'
      } else {
        photo = `${IP_URL_DEVICE}${APP_PORT}/${data[0].photo}`
      }
      const dataFinnally = {
        id: data[0].id,
        firstName: data[0].firstName,
        lastName: data[0].lastName,
        email: data[0].email,
        phoneNumber: data[0].phoneNumber,
        photo: photo
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
    console.log(error, 'kenapa error')
    responseStatus.serverError(res)
  }
}

exports.sendMail = async (req, res) => {
  const { email } = req.query
  try {
    const existingUser = await userModel.getUsersByConditionAsync({ email })
    if (existingUser.length > 0) {
      const token = jwt.sign({ email: email }, APP_KEY)
      console.log(email, 'ini email kamu')
      const data = {
        email: email,
        token: token,
        subject: 'Reset Password',
        html: ` <div>
      <h3>Please click link below to reset your password</h3>
      <a href="https://tickitz.000webhostapp.com/?token=${token}"> Reset Password <a/>
      </div>`
      }
      sendEmail(data)
      res.status(200).json({
        success: true,
        message: 'Please Chek Email to Reset Password'
      })
    }
    res.status(404).json({
      success: false,
      message: 'User Not Exist'
    })
  } catch (err) {
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
    let photo
    if (data[0].photo === 'UNDEFINED') {
      photo = 'UNDEFINED'
    } else {
      photo = `${IP_URL_DEVICE}${APP_PORT}/${data[0].photo}`
    }
    const dataFinnally = {
      id: data[0].id,
      firstName: data[0].firstName,
      lastName: data[0].lastName,
      email: data[0].email,
      phoneNumber: data[0].phoneNumber,
      photo: photo
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

exports.resetPassword = async (req, res) => {
  const data = req.body
  try {
    const salt = await bcrypt.genSalt()
    const encryptedPassword = await bcrypt.hash(data.password, salt)
    await userModel.resetPasswordByEmail(data.email, encryptedPassword)
    res.status(200).json({
      success: true,
      message: 'Password reset successfull, you can login'
    })
  } catch (err) {
    responseStatus.serverError(res)
  }
}

exports.sendMailWeb = async (req, res) => {
  const { email } = req.params
  console.log(email)
  try {
    const existingUser = await userModel.getUsersByConditionAsync({ email })
    if (existingUser.length > 0) {
      const token = jwt.sign({ email: email }, APP_KEY)
      const data = {
        email: email,
        token: token,
        subject: 'Reset Password',
        html: ` <div>
      <h3>Please click link below to reset your password</h3>
      <a href="${DOMAIN_FRONTEND_WEB}reset?token=${token}"> Reset Password <a/>
      </div>`
      }
      sendEmail(data)
      res.status(200).json({
        success: true,
        message: 'Please Chek Email to Reset Password'
      })
    }
    res.status(404).json({
      success: false,
      message: 'User Not Exist'
    })
  } catch (err) {
    responseStatus.serverError(res)
  }
}
