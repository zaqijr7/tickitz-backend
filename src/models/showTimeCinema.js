const db = require('../helpers/db')
exports.createBulkShowTimeCinema = async (data = {}) => {
  return new Promise((resolve, reject) => {
    const q = db.query(`
    INSERT INTO showtimecinema
    (id_movie, id_cinema, id_show_time, showDate)
    VALUES
    ${data.id_show_time.map(idShowTime => `(${data.id_movie}, ${data.id_cinema}, ${idShowTime}, '${data.showDate}')`).join()}
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
    console.log(q.sql)
  })
}

exports.getShowTimeCinemaJoin = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`
    SELECT movie.title, cinema.name, cinema.city, show_time.name as showTimeName, showtimecinema.showDate FROM showtimecinema
    INNER JOIN movie ON movie.id=showtimecinema.id_movie
    INNER JOIN cinema ON cinema.id=showtimecinema.id_cinema
    INNER JOIN show_time ON show_time.id=showtimecinema.id_show_time
    WHERE showtimecinema.id = ${id}
  `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
  })
}

exports.createShowTimeCinema = (data = {}) => {
  return new Promise((resolve, reject) => {
    db.query(`
    INSERT INTO showtimecinema
    (${Object.keys(data).join()})
    VALUES
    (${Object.values(data).map(item => `"${item}"`).join(',')})
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
  })
}

exports.listSchedule = (movie, city, showDate, cond) => {
  return new Promise((resolve, reject) => {
    const q = db.query(`
    SELECT id_movie, id_cinema, cinema.name, cinema.city, cinema.address, cinema.logo, showDate, 
    group_concat(DISTINCT id_show_time separator ',') as listShowTime from showtimecinema
    INNER JOIN cinema ON cinema.id=showtimecinema.id_cinema
    WHERE showtimecinema.id_movie='${movie}' AND cinema.city='${city}' AND showtimecinema.showDate='${showDate}'
    group by id_cinema
    LIMIT ${cond.limit} OFFSET ${cond.offset}
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
    console.log(q.sql)
  })
}
exports.totalData = (movie, city, showDate) => {
  return new Promise((resolve, reject) => {
    const q = db.query(`
    SELECT id_movie, id_cinema, cinema.name, cinema.city, cinema.address, cinema.logo, showDate, 
    group_concat(DISTINCT id_show_time separator ',') as listShowTime from showtimecinema
    INNER JOIN cinema ON cinema.id=showtimecinema.id_cinema
    WHERE showtimecinema.id_movie='${movie}' AND cinema.city='${city}' AND showtimecinema.showDate='${showDate}'
    group by id_cinema
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
    console.log(q.sql)
  })
}

exports.getScheduleByCity = (idMovie) => {
  return new Promise((resolve, reject) => {
    db.query(`
    SELECT DISTINCT showtimecinema.id_movie, cinema.city FROM showtimecinema
    INNER JOIN cinema ON cinema.id=showtimecinema.id_cinema
    WHERE showtimecinema.id_movie ='${idMovie}'
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
  })
}

exports.getScheduleByDate = (idMovie) => {
  return new Promise((resolve, reject) => {
    db.query(`
    SELECT DISTINCT showtimecinema.id_movie, showtimecinema.showDate FROM showtimecinema
    WHERE showtimecinema.id_movie ='${idMovie}'
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
  })
}
