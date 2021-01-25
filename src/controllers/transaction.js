const movieModel = require('../models/movies')
const seatModel = require('../models/seats')
const showTimeModel = require('../models/ShowTime')
const cinemaModel = require('../models/cinemas')
const transaction = require('../models/transaction')

exports.createTransaction = async (req, res) => {
  try {
    const data = req.body
    const id = req.userData.id
    const transactionData = {
      id_user: id,
      ...data
    }

    const valueForm = Object.values(data).filter((items) => items === '')
    if (valueForm[0] === '') {
      return res.status(400).json({
        success: false,
        message: 'Form data cannot be empty',
        results: []
      })
    }

    const resultsIdMovie = await movieModel.getMovieByIdAsync(data.id_movie)
    if (resultsIdMovie.length === 0) {
      return res.json({
        success: false,
        message: 'Some Movie are unavailable'
      })
    }

    const resultsIdCinema = await cinemaModel.checkIdCinemaAsync(data.id_cinema)
    if (resultsIdCinema.length === 0) {
      return res.json({
        success: false,
        message: 'Some Cinema are unavailable'
      })
    }

    const resultsIdShowTime = await showTimeModel.getShowTimeById(data.id_showtime)
    if (resultsIdShowTime.length === 0) {
      return res.json({
        success: false,
        message: 'Some ShowTime are unavailable'
      })
    }

    if (typeof data.id_seat === 'object') {
      const results = await seatModel.checkSeatAsync(data.id_seat)
      if (results.length !== data.id_seat.length) {
        return res.json({
          success: false,
          message: 'Some Seat are unavailable'
        })
      }
    } else if (typeof data.id_seat === 'string') {
      const results = await seatModel.checkSeatAsync(data.id_seat)
      if (results.length !== data.id_seat.length) {
        return res.json({
          success: false,
          message: 'Some Seat are unavailable'
        })
      }
    }
    if (data.id_seat.length > 1) {
      const initialResults = await transaction.createBulkTransaction(transactionData)
      if (initialResults.affectedRows > 0) {
        const resultTicket = []
        for (let index = 0; index < initialResults.affectedRows; index++) {
          resultTicket.push(await transaction.getTransactionJoin(initialResults.insertId++))
        }
        if (resultTicket.length > 0) {
          return res.json({
            success: true,
            message: 'Created Transaction Successfully',
            results: {
              name: resultTicket[0][0].name,
              movie: resultTicket[0][0].title,
              price: resultTicket[0][0].price,
              totalPayment: resultTicket[0][0].price * data.id_seat.length,
              cinema: resultTicket[0][0].cinemaName,
              showTime: resultTicket[0][0].showTimeName,
              seat: resultTicket.map(items => items[0].seatName)
            }
          })
        }
      }
    } else {
      const initialResults = await transaction.createTransactionAsync(transactionData)
      if (initialResults.affectedRows > 0) {
        const resultTicket = await transaction.getTransactionJoin(initialResults.insertId)
        console.log(resultTicket)
        if (resultTicket.length > 0) {
          return res.json({
            success: true,
            message: 'Created Transaction Successfully',
            results: {
              name: resultTicket[0].name,
              movie: resultTicket[0].title,
              price: resultTicket[0].price,
              totalPayment: resultTicket[0].price * data.id_seat.length,
              cinema: resultTicket[0].cinemaName,
              showTime: resultTicket[0].showTimeName,
              seat: resultTicket[0].seatName
            }
          })
        }
      }
    }
    return res.status(400).json({
      success: false,
      message: 'Failed to Create Transaction'
    })
  } catch (error) {
    console.log(error)
    res.json({
      success: false
    })
  }
}
