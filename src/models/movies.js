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

exports.getMovieById = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`
    SELECT * FROM movie WHERE id=${id}
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
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

exports.deleteMovieById = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`
    DELETE FROM movie WHERE id=${id}
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
  })
}

exports.getAllMovies = (cb) => {
  db.query('SELECT * FROM movie', (err, res, field) => {
    if (err) throw err
    cb(res)
  })
}

exports.getMoviesByCondition = (cond) => {
  return new Promise((resolve, reject) => {
    db.query(`
          SELECT * FROM
          movie WHERE title LIKE "%${cond.search}%"
          ORDER BY ${cond.sort} ${cond.order}
          LIMIT ${cond.limit} OFFSET ${cond.offset}
          `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
  })
}

exports.updateMovie = (id, data) => {
  return new Promise((resolve, reject) => {
    const key = Object.keys(data)
    const value = Object.values(data)
    db.query(`
      UPDATE movie
      SET ${key.map((item, index) => `${item}="${value[index]}"`)}
      WHERE id=${id}
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
  })
}

exports.totalDataMovie = (cond) => {
  return new Promise((resolve, reject) => {
    db.query(`
      SELECT * FROM
      movie WHERE title LIKE "%${cond.search}%"
      `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
  })
}

exports.totalDataMovieByMonth = (date) => {
  return new Promise((resolve, reject) => {
    db.query(`
      SELECT * FROM
      movie WHERE relaseDate LIKE "%${date}%"
      `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
  })
}

exports.getMovieByIdWithGenreAsync = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`
    SELECT m.id, m.language, m.director, m.actors, m.title, m.synopsis,
    m.relaseDate, m.runtime, m.poster, m.price, g.name as genreName
    FROM movie m
    INNER JOIN movies_info mi ON m.id=mi.idMovie
    INNER JOIN genre g ON g.id=mi.idGenre
    WHERE m.id=${id}
  `, (err, res, field) => {
      console.log(res)
      if (err) reject(err)
      resolve(res)
    })
  })
}

exports.insertGenreinMovie = (id, data) => {
  return new Promise((resolve, reject) => {
    const dataGenre = data.join(', ')
    db.query(`
      UPDATE movie
      SET genre = "${dataGenre}"
      WHERE id=${id}
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
  })
}

exports.getMoviesByMonth = (date, cond) => {
  return new Promise((resolve, reject) => {
    const q = db.query(`
          SELECT * FROM
          movie WHERE relaseDate LIKE "%${date}%"
          ORDER BY ${cond.sort} ${cond.order}
          LIMIT ${cond.limit} OFFSET ${cond.offset}
          `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
    console.log(q.sql)
  })
}

// exports.updateGenre = (id, data) => {
//   const dataGenre = data.join(', ')
//   db.query(`
//       UPDATE movie_info
//       SET idGenre = "${dataGenre}"
//       WHERE id=${id}
//     `, (err, res, field) => {
//     if (err) reject(err)
//     resolve(res)
//   })
// }
