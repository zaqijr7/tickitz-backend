const db = require('../helpers/db')

exports.createProfile = (data = {}) => {
  return new Promise((resolve, reject) => {
    db.query(`
    INSERT INTO users_profile
    (${Object.keys(data).join()})
    VALUES
    (${Object.values(data).map(item => `"${item}"`).join(',')})
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
  })
}

exports.updateProfile = (id, data) => {
  return new Promise((resolve, reject) => {
    const key = Object.keys(data)
    const value = Object.values(data)
    const query = db.query(`
      UPDATE users_profile
      SET ${key.map((item, index) => `${item}="${value[index]}"`)}
      WHERE id_user=${id}
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
    console.log(query.sql)
  })
}

exports.getProfileByIdUserJoin = (id) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
    SELECT users_profile.firstName, users_profile.lastName, users.email, users_profile.phoneNumber
    FROM users
    INNER JOIN users_profile ON users_profile.id_user=users.id
    WHERE users_profile.id_user=${id}
  `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
    console.log(query.sql)
  })
}

exports.checkProfileExist = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`
    SELECT * FROM users_profile
    WHERE id_user=${id}
  `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
  })
}
