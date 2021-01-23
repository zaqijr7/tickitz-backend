const db = require('../helpers/db')

exports.createSeatAsync = (data = {}, cb) => {
  return new Promise((resolve, reject) => {
    db.query(`
    INSERT INTO seat
    (${Object.keys(data).join()})
    VALUES
    (${Object.values(data).map(item => `"${item}"`).join(',')})
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
  })
}

exports.getSeatById = (id, cb) => {
  return new Promise((resolve, reject) => {
    db.query(`
    SELECT * FROM seat WHERE id=${id}
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
  })
}

exports.getSeatByIdAsync = async (id, cb) => {
  return new Promise((resolve, reject) => {
    db.query(`
    SELECT * FROM seat WHERE id=${id}
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
  })
}

exports.getSeatByCondition = (cond) => {
  return new Promise((resolve, reject) => {
    db.query(`
    SELECT * FROM
    seat WHERE name LIKE "%${cond.search}%"
    ORDER BY ${cond.sort} ${cond.order}
    LIMIT ${cond.limit} OFFSET ${cond.offset}
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
  })
}

exports.totalDataSeats = (cond) => {
  return new Promise((resolve, reject) => {
    db.query(`
    SELECT * FROM
    seat WHERE name LIKE "%${cond.search}%"
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
  })
}

exports.updateSeat = (id, data, cb) => {
  return new Promise((resolve, reject) => {
    const key = Object.keys(data)
    const value = Object.values(data)
    db.query(`
      UPDATE seat
      SET ${key.map((item, index) => `${item}="${value[index]}"`)}
      WHERE id=${id}
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
  })
}

exports.deleteSeatById = (id, cb) => {
  return new Promise((resolve, reject) => {
    db.query(`
    DELETE FROM seat WHERE id=${id}
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
  })
}

exports.checkIdSeatAsync = (data = [], cb) => {
  return new Promise((resolve, reject) => {
    db.query(`
      SELECT * FROM seat
      WHERE id IN (${data})
      `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
  })
}
