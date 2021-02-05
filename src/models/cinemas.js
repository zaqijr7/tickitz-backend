const db = require('../helpers/db')

exports.createCinema = (data = {}, cb) => {
  return new Promise((resolve, reject) => {
    db.query(`
    INSERT INTO cinema
    (${Object.keys(data).join()})
    VALUES
    (${Object.values(data).map(item => `"${item}"`).join(',')})
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
  })
}

exports.getCinemaById = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`
      SELECT * FROM cinema WHERE id=${id}
      `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
  })
}

exports.getAllCinema = (cb) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM cinema', (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
  })
}

exports.getCinemaByCondition = (cond) => {
  return new Promise((resolve, reject) => {
    db.query(`
      SELECT * FROM
      cinema WHERE name LIKE "%${cond.search}%"
      ORDER BY ${cond.sort} ${cond.order}
      LIMIT ${cond.limit} OFFSET ${cond.offset}
      `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
  })
}

exports.deleteCinemaById = (id, cb) => {
  return new Promise((resolve, reject) => {
    db.query(`
    DELETE FROM cinema WHERE id=${id}
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
  })
}

exports.updateCinema = (id, data) => {
  return new Promise((resolve, reject) => {
    const key = Object.keys(data)
    const value = Object.values(data)
    db.query(`
      UPDATE cinema
      SET ${key.map((item, index) => `${item}="${value[index]}"`)}
      WHERE id=${id}
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
  })
}

exports.totalDataCinema = (cond) => {
  return new Promise((resolve, reject) => {
    db.query(`
    SELECT * FROM
    cinema WHERE name LIKE "%${cond.search}%"
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
  })
}

exports.checkIdCinemaAsync = (data = [], cb) => {
  return new Promise((resolve, reject) => {
    db.query(`
      SELECT * FROM cinema
      WHERE id IN (${data})
      `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
  })
}
