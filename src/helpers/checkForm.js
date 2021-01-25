exports.checkFormRegister = (res, name, username, password) => {
  if (name === '') {
    return res.status(400).json({
      success: false,
      message: "Name can't be empty"
    })
  } else if (username === '') {
    return res.status(400).json({
      success: false,
      message: "Username can't be empty"
    })
  } else if (password === '') {
    return res.status(400).json({
      success: false,
      message: "Password can't be empty"
    })
  }
}

exports.checkFormLogin = (res, username, password) => {
  if (username === '') {
    return res.status(400).json({
      success: false,
      message: "Username can't be empty"
    })
  } else if (password === '') {
    return res.status(400).json({
      success: false,
      message: "Password can't be empty"
    })
  }
}
