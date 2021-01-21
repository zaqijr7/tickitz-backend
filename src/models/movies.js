const db = require('../helpers/db')

exports.createMovies = (data = {}, cb) => {
  db.query(`
  INSERT INTO movie
  (${Object.keys(data).join()})
  VALUES
  (${Object.values(data).map(item => `"${item}"`).join(',')})
  `, (err, res, field) => {
    if (err) throw err
    cb(res)
  })
}

exports.createMoviesAsync = (data = {}, cb) => {
  return new Promise((resolve, reject) => {
    db.query(`
    INSERT INTO movie
    (${Object.keys(data).join()})
    VALUES
    (${Object.values(data).map(item => `"${item}"`).join(',')})
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
  })
}

exports.getMovieById = (id, cb) => {
  db.query(`
  SELECT * FROM movie WHERE id=${id}
  `, (err, res, field) => {
    if (err) throw err
    cb(res)
  })
}

exports.getMovieByIdAsync = async (id, cb) => {
  return new Promise((resolve, reject) => {
    db.query(`
    SELECT * FROM movie WHERE id=${id}
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
  })
}

exports.deleteMovieById = (id, cb) => {
  db.query(`
  DELETE FROM movie WHERE id=${id}
  `, (err, res, field) => {
    if (err) throw err
    cb(res)
  })
}

exports.getAllMovies = (cb) => {
  db.query('SELECT * FROM movie', (err, res, field) => {
    if (err) throw err
    cb(res)
  })
}

exports.getMoviesByCondition = (cond, cb) => {
  db.query(`
    SELECT * FROM
    movie WHERE title LIKE "%${cond.search}%"
    ORDER BY ${cond.sort} ${cond.order}
    LIMIT ${cond.limit} OFFSET ${cond.offset}
    `, (err, res, field) => {
    if (err) throw err
    cb(res)
  })
}

exports.updateMovie = (id, data, cb) => {
  const key = Object.keys(data)
  const value = Object.values(data)
  db.query(`
    UPDATE movie
    SET ${key.map((item, index) => `${item}="${value[index]}"`)}
    WHERE id=${id}
  `, (err, res, field) => {
    if (err) throw err
    cb(res)
  })
}

exports.totalDataMovie = (cond, cb) => {
  db.query(`
  SELECT * FROM
  movie WHERE title LIKE "%${cond.search}%"
  `, (err, res, field) => {
    if (err) throw err
    cb(res)
  })
}

exports.getMovieByIdWithGenreAsync = (id) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
    SELECT m.id, m.language, m.director, m.actors, m.title, m.synopsis,
    m.relaseDate, m.runtime, m.poster, m.price, g.name as genreName
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
