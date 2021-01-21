const db = require('../helpers/db')
exports.createTransactionAsync = (data = {}, cb) => {
  console.log(data)
  return new Promise((resolve, reject) => {
    db.query(`
    INSERT INTO transaction
    (${Object.keys(data).join()})
    VALUES
    (${Object.values(data).map(item => `"${item}"`).join(',')})
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
  })
}

exports.getTransactionJoin = (id) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
    SELECT m.id, m.title, g.name as genreName
    FROM movie m
    INNER JOIN movies_info mi ON m.id=mi.idMovie
    INNER JOIN genre g ON g.id=mi.idGenre
    WHERE m.id=${id}
  `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
    console.log(query.sql)
  })
}

exports.createBulkSeat = async (id, data = []) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
    INSERT INTO transaction
    (id_movie_info, id_seat)
    VALUES
    ${data.map(idSeat => `(${id}, ${idSeat})`).join()}
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
    console.log(query.sql)
  })
}
