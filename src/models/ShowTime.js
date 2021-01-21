const db = require('../helpers/db')

exports.createShowTimetAsync = (data = {}, cb) => {
  return new Promise((resolve, reject) => {
    db.query(`
    INSERT INTO show_time
    (${Object.keys(data).join()})
    VALUES
    (${Object.values(data).map(item => `"${item}"`).join(',')})
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
  })
}

exports.getShowTimeByIdAsync = async (id, cb) => {
  return new Promise((resolve, reject) => {
    db.query(`
    SELECT * FROM show_time WHERE id=${id}
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
  })
}

exports.getShowTimeByCondition = (cond, cb) => {
  db.query(`
    SELECT * FROM
    show_time WHERE name LIKE "%${cond.search}%"
    ORDER BY ${cond.sort} ${cond.order}
    LIMIT ${cond.limit} OFFSET ${cond.offset}
    `, (err, res, field) => {
    if (err) throw err
    cb(res)
  })
}

exports.totalDataShowTime = (cond, cb) => {
  db.query(`
  SELECT * FROM
  show_time WHERE name LIKE "%${cond.search}%"
  `, (err, res, field) => {
    if (err) throw err
    cb(res)
  })
}

exports.getShowTimeById = (id, cb) => {
  db.query(`
    SELECT * FROM show_time WHERE id=${id}
    `, (err, res, field) => {
    console.log(res)
    if (err) throw err
    cb(res)
  })
}

exports.updateShowTime = (id, data, cb) => {
  const key = Object.keys(data)
  const value = Object.values(data)
  db.query(`
    UPDATE show_time
    SET ${key.map((item, index) => `${item}="${value[index]}"`)}
    WHERE id=${id}
  `, (err, res, field) => {
    if (err) throw err
    cb(res)
  })
}

exports.deleteShowTimetById = (id, cb) => {
  db.query(`
  DELETE FROM show_time WHERE id=${id}
  `, (err, res, field) => {
    if (err) throw err
    cb(res)
  })
}

exports.checkIdShowTimeAsync = (data = [], cb) => {
  return new Promise((resolve, reject) => {
    db.query(`
      SELECT * FROM show_time
      WHERE id IN (${data})
      `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
  })
}
