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
    const initialResults = await transaction.createTransactionAsync(transactionData)
    console.log(initialResults)
    if (initialResults.affectedRows > 0) {
      const resultTicket = await transaction.getTransactionJoin(initialResults.insertId)

      const ticketData = {
        id_user: id,
        id_cinema: data.id_cinema,
        movie: resultTicket[0].title,
        cinema: resultTicket[0].cinemaName,
        showTime: resultTicket[0].showTimeName,
        showDate: data.showDate,
        listSeat: resultTicket[0].seatName,
        price: resultTicket[0].price,
        totalPayment: data.totalPayment
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
    }
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
