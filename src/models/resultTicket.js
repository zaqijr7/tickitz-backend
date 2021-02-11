const db = require('../helpers/db')
exports.createResultTicketAsync = (data = {}) => {
  return new Promise((resolve, reject) => {
    const q = db.query(`
    INSERT INTO result_ticket
    (${Object.keys(data).join()})
    VALUES
    (${Object.values(data).map(item => `"${item}"`).join(',')})
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
    console.log(q.sql)
  })
}

exports.getTicketByIdAsync = async (id) => {
  return new Promise((resolve, reject) => {
    db.query(`
    SELECT * FROM result_ticket WHERE id=${id}
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
  })
}

exports.getTicketJoin = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`
    SELECT u.email, rt.movie, rt.cinema, rt.showTime, rt.listSeat, rt.price, rt.totalPayment 
    FROM users u
    INNER JOIN result_ticket rt ON u.id=rt.id_user
    WHERE rt.id=${id}
  `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
  })
}

exports.getAllTicketByIdUser = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`
    SELECT result_ticket.movie, result_ticket.cinema, cinema.logo, 
    result_ticket.showTime, result_ticket.showDate, result_ticket.listSeat,
    result_ticket.price, result_ticket.totalPayment FROM result_ticket
    INNER JOIN cinema ON cinema.id=result_ticket.id_cinema
    WHERE id_user='${id}'
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
  })
}

exports.getTicketByConditionAsync = (cond = {}) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
    SELECT * FROM result_ticket WHERE ${Object.keys(cond).map(item => `${item}="${cond[item]}"`).join(' AND ')}
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
    console.log(query.sql)
  })
}
