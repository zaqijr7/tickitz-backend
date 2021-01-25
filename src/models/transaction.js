const db = require('../helpers/db')
exports.createTransactionAsync = (data = {}) => {
  return new Promise((resolve, reject) => {
    db.query(`
    INSERT INTO buy_ticket
    (${Object.keys(data).join()})
    VALUES
    (${Object.values(data).map(item => `"${item}"`).join(',')})
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
  })
}

exports.createBulkTransaction = async (data = {}) => {
  return new Promise((resolve, reject) => {
    db.query(`
    INSERT INTO buy_ticket
    (id_user, id_movie, id_cinema, id_showtime, id_seat)
    VALUES
    ${data.id_seat.map(idSeat => `(${data.id_user}, ${data.id_movie}, ${data.id_cinema}, ${data.id_showtime}, ${idSeat})`).join()}
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
  })
}

exports.getTransactionJoin = (id) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
    SELECT users.name, movie.title, movie.price, cinema.name as cinemaName, show_time.name as showTimeName, seat.name as seatName
    FROM buy_ticket
    INNER JOIN users ON  users.id = buy_ticket.id_user
    INNER JOIN movie ON movie.id = buy_ticket.id_movie
    INNER JOIN cinema ON cinema.id = buy_ticket.id_cinema
    INNER JOIN show_time ON show_time.id = buy_ticket.id_showtime
    INNER JOIN seat ON seat.id = buy_ticket.id_seat
    WHERE buy_ticket.id=${id}
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
