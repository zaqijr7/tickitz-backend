exports.errorFindGenre = (res) => {
  return res.status(400).json({
    success: false,
    message: 'Some genre are unavailable'
  })
}

exports.serverError = (res) => {
  return res.status(500).json({
    success: false,
    message: 'Server Error'
  })
}

exports.errorInputForm = (res) => {
  return res.status(400).json({
    success: false,
    message: 'Form data cannot be empty',
    results: []
  })
}

exports.emailIsExist = (res) => {
  return res.status(400).json({
    success: false,
    message: 'Registered failed, email already exist'
  })
}

exports.errorUploadPoster = (res) => {
  return res.status(400).json({
    success: false,
    message: 'Only .png, .jpg and .jpeg format allowed!'
  })
}
