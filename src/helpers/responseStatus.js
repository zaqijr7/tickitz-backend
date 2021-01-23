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

exports.usernameIsExist = (res) => {
  return res.status(400).json({
    success: false,
    message: 'Registered failed, username already exist'
  })
}
