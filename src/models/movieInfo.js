const db = require('../helpers/db')

exports.createMovieInfo = (data = {}, cb) => {
  const query = db.query(`
  INSERT INTO movies_info
  (${Object.keys(data).join()})
  VALUES
  (${Object.values(data).map(item => `"${item}"`).join(',')})
  `, (err, res, field) => {
    if (err) throw err
    console.log(field)
    cb(res)
  })
  console.log(query.sql)
}

exports.createBulkMovieInfo = async (id, data = []) => {
  return new Promise((resolve, reject) => {
    db.query(`
    INSERT INTO movies_info
    (idMovie, idGenre)
    VALUES
    ${data.map(idGenre => `(${id}, ${idGenre})`).join()}
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
  })
}

exports.checkMovieInfoAsync = (data = [], cb) => {
  return new Promise((resolve, reject) => {
    db.query(`
      SELECT * FROM movies_info
      WHERE idMovie IN (${data})
      `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
  })
}

exports.deleteGenre = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`
    DELETE FROM movies_info
    WHERE idMovie = ${id};
      `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
  })
}
