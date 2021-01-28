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

exports.getShowTimeByCondition = (cond) => {
  return new Promise((resolve, reject) => {
    db.query(`
    SELECT * FROM
    show_time WHERE name LIKE "%${cond.search}%"
    ORDER BY ${cond.sort} ${cond.order}
    LIMIT ${cond.limit} OFFSET ${cond.offset}
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
  })
}

exports.totalDataShowTime = (cond) => {
  return new Promise((resolve, reject) => {
    db.query(`
    SELECT * FROM
    show_time WHERE name LIKE "%${cond.search}%"
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
  })
}

exports.getShowTimeById = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`
    SELECT * FROM show_time WHERE id=${id}
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
  })
}

exports.updateShowTime = (id, data, cb) => {
  return new Promise((resolve, reject) => {
    const key = Object.keys(data)
    const value = Object.values(data)
    db.query(`
      UPDATE show_time
      SET ${key.map((item, index) => `${item}="${value[index]}"`)}
      WHERE id=${id}
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
  })
}

exports.deleteShowTimetById = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`
    DELETE FROM show_time WHERE id=${id}
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
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

exports.checkShowTimeAsync = (data = [], cb) => {
  return new Promise((resolve, reject) => {
    if (data.length > 1) {
      db.query(`
      SELECT * FROM show_time
      WHERE id IN (${data.map(item => item).join()})
      `, (err, res, field) => {
        if (err) reject(err)
        resolve(res)
      })
    } else {
      db.query(`
      SELECT * FROM show_time
      WHERE id IN (${data})
      `, (err, res, field) => {
        if (err) reject(err)
        resolve(res)
      })
    }
  })
}
