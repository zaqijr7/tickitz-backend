const showTimeModel = require('../models/ShowTime')
const nextLink = require('../middlewares/nextLink')
const prevLink = require('../middlewares/prevLink')
const { APP_URL, APP_PORT } = process.env

exports.createShowTime = async (req, res) => {
  const data = req.body
  const valueForm = Object.values(data).filter((items) => items === '')
  if (valueForm[0] === '') {
    return res.status(400).json({
      success: false,
      message: 'Form data cannot be empty',
      results: []
    })
  }
  const initialResults = await showTimeModel.createShowTimetAsync(data)
  if (initialResults.affectedRows > 0) {
    const seat = await showTimeModel.getShowTimeByIdAsync(initialResults.insertId)
    if (seat.length > 0) {
      return res.json({
        success: true,
        message: 'Created Show TIme Successfully',
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

exports.listShowTime = (req, res) => {
  const cond = req.query
  cond.search = cond.search || ''
  cond.page = Number(cond.page) || 1
  cond.limit = Number(cond.limit) || 5
  cond.dataLimit = cond.limit * cond.page
  cond.offset = (cond.page - 1) * cond.limit
  cond.sort = cond.sort || 'id'
  cond.order = cond.order || 'ASC'

  showTimeModel.getShowTimeByCondition(cond, results => {
    showTimeModel.totalDataShowTime(cond, totalData => {
      return res.json({
        success: true,
        message: 'List of all Show Time',
        results,
        pageInfo: {
          totalData: totalData.length,
          totalDataInCurrentPage: results.length,
          nextLink: nextLink.nextLinkShowTime(cond, totalData, APP_URL, APP_PORT),
          prevLink: prevLink.prevLinkShowTime(cond, totalData, APP_URL, APP_PORT)
        }
      })
    })
  })
}

exports.updateShowTime = (req, res) => {
  const { id } = req.params
  const data = req.body
  showTimeModel.getShowTimeById(id, initialResult => {
    if (initialResult.length > 0) {
      showTimeModel.updateShowTime(id, data, results => {
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

exports.deleteShowTime = async (req, res) => {
  const { id } = req.params
  showTimeModel.getShowTimeById(id, (initialResult) => {
    if (initialResult.length > 0) {
      showTimeModel.deleteShowTimetById(id, results => {
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
