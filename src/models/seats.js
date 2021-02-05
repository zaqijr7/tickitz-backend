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

exports.getSeatById = (id) => {
  return new Promise((resolve, reject) => {
    const a = db.query(`
    SELECT * FROM seat WHERE id=${id}
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
    console.log(a.sql)
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

exports.checkSeatAsync = (data = [], cb) => {
  return new Promise((resolve, reject) => {
    if (data.length > 1) {
      db.query(`
      SELECT * FROM seat
      WHERE id IN (${data.map(item => item).join()})
      `, (err, res, field) => {
        if (err) reject(err)
        resolve(res)
      })
    } else {
      db.query(`
      SELECT * FROM seat
      WHERE id IN (${data})
      `, (err, res, field) => {
        if (err) reject(err)
        resolve(res)
      })
    }
  })
}

exports.checkSoldSeat = (data) => {
  return new Promise((resolve, reject) => {
    const q = db.query(`
    SELECT group_concat(DISTINCT listSeat separator ',') as listSold FROM result_ticket 
    WHERE movie LIKE '%${data.movie}%' AND cinema LIKE '%${data.cinema}%' AND showTime LIKE '%${data.showTime}%' 
    AND showDate LIKE '%${data.showDate}%'
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
    console.log(q.sql)
  })
}
