const { check, validationResult } = require('express-validator')

exports.validationInput = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(500).json({
      success: false,
      message: errors.array()[0].msg

    })
  }
  return next()
}

exports.validationInputRegister = [
  check('email', "Email can't be empty").notEmpty().isEmail().withMessage('Please enter email correctly'),
  check('password', "Password can't be empty").notEmpty().isLength(6).withMessage('Password character length must be six')
]

exports.validationInputProfile = [
  check('firstName', "First name field can't be empty").notEmpty(),
  check('lastName', "Last name field can't be empty").notEmpty(),
  check('phoneNumber', "Phone number field can't be empty").notEmpty()
]
