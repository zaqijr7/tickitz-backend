const movieInfoModel = require('../models/movieInfo')
const seatModel = require('../models/seats')
const showTimeModel = require('../models/ShowTime')
const cinemaModel = require('../models/cinemas')
const transaction = require('../models/transaction')

exports.createTransaction = async (req, res) => {
  const data = req.body
  console.log(data.id_seat)
  const valueForm = Object.values(data).filter((items) => items === '')
  if (valueForm[0] === '') {
    return res.status(400).json({
      success: false,
      message: 'Form data cannot be empty',
      results: []
    })
  }
  const movieInfoId = []
  const resultsIdMovie = await movieInfoModel.checkMovieInfoAsync(data.id_movie_info)
  if (resultsIdMovie.length !== data.id_movie_info.length) {
    return res.json({
      success: false,
      message: 'Some Movie are unavailable'
    })
  } else {
    resultsIdMovie.forEach((item) => movieInfoId.push(item.id))
  }

  const selectedIdSeat = []
  const resultsIdSeat = await seatModel.checkIdSeatAsync(data.id_seat)
  if (resultsIdSeat.length !== data.id_seat.length) {
    return res.json({
      success: false,
      message: 'Some Seat are unavailable'
    })
  } else {
    resultsIdSeat.forEach(item => {
      selectedIdSeat.push(item.id)
    })
  }

  const selectedShowTime = []
  const resultsIdShowTime = await showTimeModel.checkIdShowTimeAsync(data.id_show_time)
  if (resultsIdShowTime.length !== data.id_show_time.length) {
    return res.json({
      success: false,
      message: 'Some ShowTime are unavailable'
    })
  } else {
    resultsIdShowTime.forEach(item => {
      selectedShowTime.push(item.id)
    })
  }

  const selectedCinema = []
  const resultsIdCinema = await cinemaModel.checkIdCinemaAsync(data.id_cinema)
  if (resultsIdCinema.length !== data.id_cinema.length) {
    return res.json({
      success: false,
      message: 'Some Cinema are unavailable'
    })
  } else {
    resultsIdCinema.forEach(item => {
      selectedCinema.push(item.id)
    })
  }

  const transactionData = {
    name: data.name,
    id_movie_info: movieInfoId,
    id_seat: selectedIdSeat,
    id_show_time: selectedShowTime,
    id_cinema: selectedCinema
  }
  const initialResults = await transaction.createTransactionAsync(transactionData)
  if (initialResults.affectedRows > 0) {
    // if (selectedIdSeat.length > 0) {
    //   await transaction.createBulkSeat(movieInfoId[0], selectedIdSeat)
    // }
    const movies = await transaction.getTransactionJoin(initialResults.insertId)
    if (movies.length > 0) {
      return res.json({
        success: true,
        message: 'Created Movie Successfully',
        results: {
          id: movies[0].id,
          language: movies[0].language,
          genre: movies[0].genre,
          director: movies[0].director,
          actors: movies[0].actors,
          title: movies[0].title,
          synopsis: movies[0].synopsis,
          relaseDate: movies[0].relaseDate,
          runtime: movies[0].runtime,
          poster: movies[0].poster,
          price: movies[0].price,
          genres: movies.map(item => item.genreName)
        }
      })
    } else {
      return res.status(400).json({
        success: false,
        message: 'Failed to Create Transaction'
      })
    }
  }
}
