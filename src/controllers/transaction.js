// const movieModel = require('../models/movies')
// const seatModel = require('../models/seats')
// const showTimeModel = require('../models/ShowTime')
// const cinemaModel = require('../models/cinemas')
const ticketModel = require('../models/resultTicket')
const transaction = require('../models/transaction')
const responseStatus = require('../helpers/responseStatus')

exports.createTransaction = async (req, res) => {
  try {
    const data = req.body
    const id = req.userData.id
    const transactionData = {
      id_user: id,
      id_movie: data.id_movie,
      id_cinema: data.id_cinema,
      id_showtime: data.id_showtime,
      seat: data.seat
    }
    // const valueForm = Object.values(data).filter((items) => items === '')
    // if (valueForm[0] === '') {
    //   return res.status(400).json({
    //     success: false,
    //     message: 'Form data cannot be empty',
    //     results: []
    //   })
    // }

    // const resultsIdMovie = await movieModel.getMovieByIdAsync(data.id_movie)
    // if (resultsIdMovie.length === 0) {
    //   return res.json({
    //     success: false,
    //     message: 'Some Movie are unavailable'
    //   })
    // }

    // const resultsIdCinema = await cinemaModel.checkIdCinemaAsync(data.id_cinema)
    // if (resultsIdCinema.length === 0) {
    //   return res.json({
    //     success: false,
    //     message: 'Some Cinema are unavailable'
    //   })
    // }

    // const resultsIdShowTime = await showTimeModel.getShowTimeById(data.id_showtime)
    // if (resultsIdShowTime.length === 0) {
    //   return res.json({
    //     success: false,
    //     message: 'Some ShowTime are unavailable'
    //   })
    // }

    // if (typeof data.id_seat === 'object') {
    //   const results = await seatModel.checkSeatAsync(data.id_seat)
    //   if (results.length !== data.id_seat.length) {
    //     return res.json({
    //       success: false,
    //       message: 'Some Seat are unavailable'
    //     })
    //   }
    // } else if (typeof data.id_seat === 'string') {
    //   const results = await seatModel.checkSeatAsync(data.id_seat)
    //   if (results.length !== data.id_seat.length) {
    //     return res.json({
    //       success: false,
    //       message: 'Some Seat are unavailable'
    //     })
    //   }
    // }

    // if (data.id_seat.length > 1) {
    //   const initialResults = await transaction.createBulkTransaction(transactionData)
    //   if (initialResults.affectedRows > 0) {
    //     const resultTicket = []
    //     for (let index = 0; index < initialResults.affectedRows; index++) {
    //       resultTicket.push(await transaction.getTransactionJoin(initialResults.insertId++))
    //     }
    //     const ticketData = {
    //       id_user: id,
    //       movie: resultTicket[0][0].title,
    //       cinema: resultTicket[0][0].cinemaName,
    //       showTime: resultTicket[0][0].showTimeName,
    //       listSeat: resultTicket.map(items => items[0].seatName),
    //       price: resultTicket[0][0].price,
    //       totalPayment: resultTicket[0][0].price * data.id_seat.length
    //     }
    //     const ticket = await ticketModel.createResultTicketAsync(ticketData)
    //     const ticketDetail = await ticketModel.getTicketJoin(ticket.insertId)
    //     if (ticketDetail.length > 0) {
    //       return res.json({
    //         success: true,
    //         message: 'Created Transaction Successfully',
    //         results: ticketDetail
    //       })
    //     }
    //   }
    // } else {
    const initialResults = await transaction.createTransactionAsync(transactionData)
    console.log(initialResults)
    if (initialResults.affectedRows > 0) {
      const resultTicket = await transaction.getTransactionJoin(initialResults.insertId)

      const ticketData = {
        id_user: id,
        movie: resultTicket[0].title,
        cinema: resultTicket[0].cinemaName,
        showTime: resultTicket[0].showTimeName,
        showDate: data.showDate,
        listSeat: resultTicket[0].seatName,
        price: resultTicket[0].price,
        totalPayment: resultTicket[0].price * data.seat.split().length
      }
      console.log(ticketData, '<<<<<<<<<<<<<<<<<< ini  ticket data')
      const ticket = await ticketModel.createResultTicketAsync(ticketData)
      const ticketDetail = await ticketModel.getTicketJoin(ticket.insertId)
      if (ticketDetail.length > 0) {
        return res.json({
          success: true,
          message: 'Created Transaction Successfully',
          results: ticketDetail
        })
      }
    //   }
    }
    // return res.status(400).json({
    //   success: false,
    //   message: 'Failed to Create Transaction'
    // })
  } catch (error) {
    responseStatus.serverError(res)
  }
}

exports.getTicketById = async (req, res) => {
  const idParam = req.params.id
  const idUser = req.userData.id
  try {
    const result = await ticketModel.getTicketByConditionAsync({ id: Number(idParam), id_user: idUser })
    if (result.length > 0) {
      return res.status(200).json({
        success: true,
        message: 'Detail ticket',
        result: result[0]
      })
    }
    return res.status(404).json({
      success: false,
      message: 'Ticket not exist'
    })
  } catch (error) {
    responseStatus.serverError(res)
  }
}

exports.listTicketsByIdUser = async (req, res) => {
  const id = req.userData.id
  try {
    const results = await ticketModel.getAllTicketByIdUser(id)
    console.log(results)
    if (results.length > 0) {
      return res.status(200).json({
        success: true,
        message: 'List your ticket',
        results: results
      })
    }
    return res.status(404).json({
      success: false,
      message: 'No ticket purchases were found'
    })
  } catch (error) {
    responseStatus.serverError(res)
  }
}
