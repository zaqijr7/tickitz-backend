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
    const query = db.query(`
    SELECT * FROM users WHERE ${Object.keys(cond).map(item => `${item}="${cond[item]}"`).join(' AND ')}
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
    console.log(query.sql)
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
