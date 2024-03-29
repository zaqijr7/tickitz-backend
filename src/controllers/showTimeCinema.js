const showTimeModel = require('../models/ShowTime')
const cinemaModel = require('../models/cinemas')
const showTimeCinemaModel = require('../models/showTimeCinema')
const responseStatus = require('../helpers/responseStatus')
const nextLink = require('../middlewares/nextLink')
const prevLink = require('../middlewares/prevLink')
const { IP_URL_DEVICE, APP_PORT } = process.env

exports.createShowTimeCinema = async (req, res) => {
  try {
    const data = req.body
    console.log(data)
    const resultsIdCinema = await cinemaModel.checkIdCinemaAsync(data.id_cinema)
    if (resultsIdCinema.length === 0) {
      return res.json({
        success: false,
        message: 'Some Cinema are unavailable'
      })
    }

    if (typeof data.id_show_time === 'object') {
      const results = await showTimeModel.checkShowTimeAsync(data.id_show_time)
      if (results.length !== data.id_show_time.length) {
        return res.json({
          success: false,
          message: 'Some ShowTime are unavailable'
        })
      }
    } else if (typeof data.id_show_time === 'string') {
      const results = await showTimeModel.checkIdShowTimeAsync(data.id_show_time)
      if (results.length !== data.id_show_time.length) {
        return res.json({
          success: false,
          message: 'Some ShowTime are unavailable'
        })
      }
    }
    if (data.id_show_time.length > 1) {
      const initialResults = await showTimeCinemaModel.createBulkShowTimeCinema(data)
      console.log(initialResults)
      if (initialResults.affectedRows > 0) {
        const resultData = []
        for (let index = 0; index < initialResults.affectedRows; index++) {
          resultData.push(await showTimeCinemaModel.getShowTimeCinemaJoin(initialResults.insertId++))
        }
        const finallyData = {
          movie: resultData[0][0].title,
          cinema: resultData[0][0].name,
          showTimeList: resultData.map(items => items[0].showTimeName),
          showDate: resultData[0][0].showDate
        }

        return res.json({
          success: true,
          message: 'Created Schedule Successfully',
          results: finallyData
        })
      }
    } else {
      const initialResults = await showTimeCinemaModel.createShowTimeCinema(data)
      if (initialResults.affectedRows > 0) {
        const resultData = await showTimeCinemaModel.getShowTimeCinemaJoin(initialResults.insertId)
        console.log(resultData)

        const finallyData = {
          cinema: resultData[0].name,
          showTimeList: resultData[0].showTimeName,
          showDate: resultData[0].showDate
        }
        return res.json({
          success: true,
          message: 'Created Transaction Successfully',
          results: finallyData
        })
      }
    }
    return res.status(400).json({
      success: false,
      message: 'Failed to Create Transaction'
    })
  } catch (error) {
    responseStatus.serverError(res)
  }
}

exports.scheduleCinema = async (req, res) => {
  let { movie, city, showDate } = req.body
  if (showDate === '') showDate = '1990-01-01'
  console.log(showDate, 'INI DATE')
  const cond = req.query
  cond.page = Number(cond.page) || 1
  cond.limit = Number(cond.limit) || 3
  cond.dataLimit = cond.limit * cond.page
  cond.offset = (cond.page - 1) * cond.limit
  try {
    const results = await showTimeCinemaModel.listSchedule(movie, city, showDate, cond)
    const totalDataSchedule = await showTimeCinemaModel.totalData(movie, city, showDate)
    const hasil = []
    for (let index = 0; index < results.length; index++) {
      const FetchData = {
        id_cinema: results[index].id_cinema,
        name: results[index].name,
        city: results[index].city,
        address: results[index].address,
        logo: `${IP_URL_DEVICE}${APP_PORT}/${results[index].logo}`,
        showDate: results[index].showDate,
        listShowTime: await Promise.all(results[index].listShowTime.split(',').map(item => showTimeModel.getShowTimeNameById(item)))
      }
      hasil.push(FetchData)
    }
    console.log(totalDataSchedule)
    if (results.length > 0) {
      res.status(200).json({
        success: true,
        message: 'List schedule cinema',
        results: hasil,
        pageInfo: {
          totalData: totalDataSchedule.length,
          totalPage: Math.ceil(totalDataSchedule.length / cond.limit),
          dataCurrentPage: hasil.length,
          currentPage: cond.page,
          nextLink: nextLink.nextLinkSchedule(cond, totalDataSchedule, IP_URL_DEVICE, APP_PORT),
          prevLink: prevLink.prevLinkSchedule(cond, totalDataSchedule, IP_URL_DEVICE, APP_PORT)
        }
      })
    } else {
      res.status(404).json({
        success: false,
        message: 'Opss Sorry, Schedule not Found'
      })
    }
  } catch (err) {
    console.log(err)
    responseStatus.serverError(res)
  }
}

exports.getScheduleByCondition = async (req, res) => {
  const { idMovie } = req.query
  try {
    const citySchedule = await showTimeCinemaModel.getScheduleByCity(idMovie)
    const dateSchedule = await showTimeCinemaModel.getScheduleByDate(idMovie)
    const dataSchedule = {
      idMovie: idMovie,
      dateShow: dateSchedule.map(items => items.showDate),
      city: citySchedule.map(items => items.city)
    }
    res.status(200).json({
      success: true,
      message: 'Schedule by condition',
      results: dataSchedule
    })
  } catch (err) {
    responseStatus.serverError(res)
  }
}
