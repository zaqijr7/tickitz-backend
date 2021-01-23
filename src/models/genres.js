const db = require('../helpers/db')

exports.createGenre = (data = {}, cb) => {
  return new Promise((resolve, reject) => {
    db.query(`
    INSERT INTO genre
    (${Object.keys(data).join()})
    VALUES
    (${Object.values(data).map(item => `"${item}"`).join(',')})
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
  })
}

exports.getGenreByid = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`
    SELECT * FROM genre WHERE id=${id}
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
  })
}

exports.getGenreByCondition = (cond) => {
  return new Promise((resolve, reject) => {
    db.query(`
    SELECT * FROM
    genre WHERE name LIKE "%${cond.search}%"
    ORDER BY ${cond.sort} ${cond.order}
    LIMIT ${cond.limit} OFFSET ${cond.offset}
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
  })
}

exports.deleteGenreById = (id, cb) => {
  return new Promise((resolve, reject) => {
    db.query(`
    DELETE FROM genre WHERE id=${id}
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
  })
}

exports.updateGenre = (id, data) => {
  return new Promise((resolve, reject) => {
    const key = Object.keys(data)
    const value = Object.values(data)
    db.query(`
      UPDATE genre
      SET ${key.map((item, index) => `${item}="${value[index]}"`)}
      WHERE id=${id}
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
  })
}

exports.totalDataGenre = (cond) => {
  return new Promise((resolve, reject) => {
    db.query(`
    SELECT * FROM
    genre WHERE name LIKE "%${cond.search}%"
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
  })
}

exports.checkGenre = (data = [], cb) => {
  const query = db.query(`
  SELECT * FROM genres
  WHERE id IN (${data.map(item => item).join()})
  `, (err, res, field) => {
    if (err) throw err
    console.log(field)
    cb(res)
  })
  console.log(query.sql)
}

exports.checkGenreAsync = (data = [], cb) => {
  return new Promise((resolve, reject) => {
    if (data.length > 1) {
      db.query(`
      SELECT * FROM genre
      WHERE id IN (${data.map(item => item).join()})
      `, (err, res, field) => {
        if (err) reject(err)
        resolve(res)
      })
    } else {
      db.query(`
      SELECT * FROM genre
      WHERE id IN (${data})
      `, (err, res, field) => {
        if (err) reject(err)
        resolve(res)
      })
    }
  })
}
