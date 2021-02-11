const db = require('../helpers/db')

exports.createUserAsync = (data = {}) => {
  return new Promise((resolve, reject) => {
    db.query(`
    INSERT INTO users
    (${Object.keys(data).join()})
    VALUES
    (${Object.values(data).map(item => `"${item}"`).join(',')})
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
  })
}

exports.getUsersByConditionAsync = (cond) => {
  return new Promise((resolve, reject) => {
    db.query(`
    SELECT * FROM users WHERE ${Object.keys(cond).map(item => `${item}="${cond[item]}"`).join(' AND ')}
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
  })
}

exports.getUserById = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`
    SELECT * FROM users WHERE id=${id}
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
  })
}

exports.updatePassword = (id, password) => {
  return new Promise((resolve, reject) => {
    db.query(`
    UPDATE users
    SET password="${password}"
    WHERE id=${id}
  `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
  })
}

exports.updateEmail = (id, email) => {
  return new Promise((resolve, reject) => {
    db.query(`
    UPDATE users
    SET email="${email}"
    WHERE id=${id}
  `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
  })
}

exports.getUsersProfileById = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`
    SELECT users.id, users_profile.firstName, users_profile.lastName, users.email, users_profile.phoneNumber, users_profile.photo 
    FROM users_profile
    INNER JOIN users ON users.id=users_profile.id_user 
    WHERE users_profile.id_user='${id}'
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
  })
}
