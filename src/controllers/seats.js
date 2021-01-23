const seatModel = require('../models/seats')
const nextLink = require('../middlewares/nextLink')
const prevLink = require('../middlewares/prevLink')
const responseStatus = require('../helpers/responseStatus')
const { APP_URL, APP_PORT } = process.env

exports.createSeat = async (req, res) => {
  const data = req.body
  const valueForm = Object.values(data).filter((items) => items === '')
  if (valueForm[0] === '') {
    return res.status(400).json({
      success: false,
      message: 'Form data cannot be empty',
      results: []
    })
  }
  try {
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
  } catch (error) {
    responseStatus.serverError(res)
  }
}

exports.listSeats = async (req, res) => {
  const cond = req.query
  cond.search = cond.search || ''
  cond.page = Number(cond.page) || 1
  cond.limit = Number(cond.limit) || 5
  cond.dataLimit = cond.limit * cond.page
  cond.offset = (cond.page - 1) * cond.limit
  cond.sort = cond.sort || 'id'
  cond.order = cond.order || 'ASC'
  try {
    const results = await seatModel.getSeatByCondition(cond)
    const totalData = await seatModel.totalDataSeats(cond)
    console.log(totalData)
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
  } catch (error) {
    responseStatus.serverError(res)
  }
}

exports.updateSeat = async (req, res) => {
  const { id } = req.params
  const data = req.body
  try {
    const initialResult = await seatModel.getSeatById(id)
    if (initialResult.length > 0) {
      await seatModel.updateSeat(id, data)
      return res.json({
        success: true,
        message: 'Update data success',
        results: {
          ...initialResult[0],
          ...data
        }
      })
    } else {
      return res.status(400).json({
        success: false,
        message: 'Failed to update data'
      })
    }
  } catch (error) {
    responseStatus.serverError(res)
  }
}

exports.deleteSeat = async (req, res) => {
  const { id } = req.params
  try {
    const initialResult = await seatModel.getSeatById(id)
    if (initialResult.length > 0) {
      await seatModel.deleteSeatById(id)
      return res.json({
        success: true,
        message: 'Data deleted successfully',
        results: initialResult[0]
      })
    } else {
      return res.status(400).json({
        success: false,
        message: 'Failed to delete data'
      })
    }
  } catch (error) {
    responseStatus.serverError(res)
  }
}

exports.getSeatById = async (req, res) => {
  const { id } = req.params
  try {
    const initialResult = await seatModel.getSeatById(id)
    if (initialResult.length > 0) {
      return res.json({
        success: true,
        message: 'Cinema by id',
        results: initialResult[0]
      })
    } else {
      return res.status(400).json({
        success: false,
        message: 'Failed to get data, file not exist'
      })
    }
  } catch (error) {
    responseStatus.serverError(res)
  }
}
