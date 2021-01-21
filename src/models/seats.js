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
  db.query(`
    SELECT * FROM seat WHERE id=${id}
    `, (err, res, field) => {
    console.log(res)
    if (err) throw err
    cb(res)
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

exports.getSeatByCondition = (cond, cb) => {
  db.query(`
    SELECT * FROM
    seat WHERE name LIKE "%${cond.search}%"
    ORDER BY ${cond.sort} ${cond.order}
    LIMIT ${cond.limit} OFFSET ${cond.offset}
    `, (err, res, field) => {
    if (err) throw err
    cb(res)
  })
}

exports.totalDataSeats = (cond, cb) => {
  db.query(`
  SELECT * FROM
  seat WHERE name LIKE "%${cond.search}%"
  `, (err, res, field) => {
    if (err) throw err
    cb(res)
  })
}

exports.updateSeat = (id, data, cb) => {
  const key = Object.keys(data)
  const value = Object.values(data)
  db.query(`
    UPDATE seat
    SET ${key.map((item, index) => `${item}="${value[index]}"`)}
    WHERE id=${id}
  `, (err, res, field) => {
    if (err) throw err
    cb(res)
  })
}

exports.deleteSeatById = (id, cb) => {
  db.query(`
  DELETE FROM seat WHERE id=${id}
  `, (err, res, field) => {
    if (err) throw err
    cb(res)
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
