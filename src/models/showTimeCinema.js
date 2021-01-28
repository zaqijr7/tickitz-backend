const db = require('../helpers/db')
exports.createBulkShowTimeCinema = async (data = {}) => {
  return new Promise((resolve, reject) => {
    db.query(`
    INSERT INTO showtimecinema
    (id_cinema, id_show_time, showDate)
    VALUES
    ${data.id_show_time.map(idShowTime => `(${data.id_cinema}, ${idShowTime}, '${data.showDate}')`).join()}
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
  })
}

exports.getShowTimeCinemaJoin = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`
    SELECT cinema.name, cinema.city, show_time.name as showTimeName, showtimecinema.showDate FROM showtimecinema
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
