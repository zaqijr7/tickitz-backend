const seatModel = require('../models/seats')
const nextLink = require('../middlewares/nextLink')
const prevLink = require('../middlewares/prevLink')
const { APP_URL, APP_PORT } = process.env

exports.createSeat = async (req, res) => {
  const data = req.body
  console.log(data)
  const valueForm = Object.values(data).filter((items) => items === '')
  if (valueForm[0] === '') {
    return res.status(400).json({
      success: false,
      message: 'Form data cannot be empty',
      results: []
    })
  }
  const initialResults = await seatModel.createSeatAsync(data)
  if (initialResults.affectedRows > 0) {
    const seat = await seatModel.getSeatByIdAsync(initialResults.insertId)
    if (seat.length > 0) {
      return res.json({
        success: true,
        message: 'Created Seat Successfully',
        results: seat[0]
      })
    } else {
      return res.status(400).json({
        success: false,
        message: 'Failed to Create Seat'
      })
    }
  }
}

exports.listSeats = (req, res) => {
  const cond = req.query
  cond.search = cond.search || ''
  cond.page = Number(cond.page) || 1
  cond.limit = Number(cond.limit) || 5
  cond.dataLimit = cond.limit * cond.page
  cond.offset = (cond.page - 1) * cond.limit
  cond.sort = cond.sort || 'id'
  cond.order = cond.order || 'ASC'

  seatModel.getSeatByCondition(cond, results => {
    seatModel.totalDataSeats(cond, totalData => {
      return res.json({
        success: true,
        message: 'List of all Seat',
        results,
        pageInfo: {
          totalData: totalData.length,
          totalDataInCurrentPage: results.length,
          nextLink: nextLink.nextLinkSeat(cond, totalData, APP_URL, APP_PORT),
          prevLink: prevLink.prevLinkSeat(cond, totalData, APP_URL, APP_PORT)
        }
      })
    })
  })
}

exports.updateSeat = (req, res) => {
  const { id } = req.params
  const data = req.body
  seatModel.getSeatById(id, initialResult => {
    if (initialResult.length > 0) {
      seatModel.updateSeat(id, data, results => {
        return res.json({
          success: true,
          message: 'Update data success',
          results: {
            ...initialResult[0],
            ...data
          }
        })
      })
    } else {
      return res.status(400).json({
        success: false,
        message: 'Failed to update data'
      })
    }
  })
}

exports.deleteSeat = async (req, res) => {
  const { id } = req.params
  seatModel.getSeatById(id, (initialResult) => {
    if (initialResult.length > 0) {
      seatModel.deleteSeatById(id, results => {
        return res.json({
          success: true,
          message: 'Data deleted successfully',
          results: initialResult[0]
        })
      })
    } else {
      return res.status(400).json({
        success: false,
        message: 'Failed to delete data'
      })
    }
  })
}
