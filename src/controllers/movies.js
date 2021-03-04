const movieModels = require('../models/movies')
const genreModels = require('../models/genres')
const movieInfoModels = require('../models/movieInfo')
const responseStatus = require('../helpers/responseStatus')
const nextLink = require('../middlewares/nextLink')
const prevLink = require('../middlewares/prevLink')
const multer = require('multer')
const upload = require('../helpers/uploads').single('poster')
const { APP_URL, IP_URL_DEVICE, APP_PORT } = process.env
// const data = require('../helpers/listMovies')

exports.listMovies = async (req, res) => {
  const cond = req.query
  cond.search = cond.search || ''
  cond.page = Number(cond.page) || 1
  cond.limit = Number(cond.limit) || 5
  cond.dataLimit = cond.limit * cond.page
  cond.offset = (cond.page - 1) * cond.limit
  cond.sort = cond.sort || 'id'
  cond.order = cond.order || 'ASC'
  try {
    const results = await movieModels.getMoviesByCondition(cond)
    const totalData = await movieModels.totalDataMovie(cond)
    return res.json({
      success: true,
      message: 'List of all Movies',
      results,
      pageInfo: {
        totalData: totalData.length,
        totalDataInCurrentPage: results.length,
        nextLink: nextLink.nextLinkMovies(cond, totalData, APP_URL, APP_PORT),
        prevLink: prevLink.prevLinkMovies(cond, totalData, APP_URL, APP_PORT)
      }
    })
  } catch (err) {
    responseStatus.serverError(res)
  }
}

exports.createMovie = async (req, res) => {
  upload(req, res, async err => {
    const data = req.body
    const valueForm = Object.values(data).filter((items) => items === '')
    console.log(valueForm)
    if (valueForm[0] === '') {
      responseStatus.errorInputForm(res)
    }
    if (err instanceof multer.MulterError) {
      responseStatus.errorUploadPoster(res)
    } else if (err) {
      responseStatus.errorUploadPoster(res)
    }
    const selectedGenre = []
    if (typeof data.idGenre === 'object') {
      try {
        const results = await genreModels.checkGenreAsync(data.idGenre)
        if (results.length !== data.idGenre.length) {
          responseStatus.errorFindGenre(res)
        } else {
          results.forEach(item => {
            selectedGenre.push(item.id)
          })
        }
      } catch (error) {
        responseStatus.serverError(res)
      }
    } else if (typeof data.idGenre === 'string') {
      try {
        const results = await genreModels.checkGenreAsync(data.idGenre)
        if (results.length !== data.idGenre.length) {
          responseStatus.errorFindGenre(res)
        } else {
          results.forEach(item => {
            selectedGenre.push(item.id)
          })
        }
      } catch (error) {
        responseStatus.serverError(res)
      }
    }

    const movieData = {
      language: data.language,
      genre: data.genre,
      director: data.director,
      actors: data.actors,
      title: data.title,
      synopsis: data.synopsis,
      relaseDate: data.relaseDate,
      runtime: data.runtime,
      poster: `${req.file.destination}/${req.file.filename}` || null,
      price: data.price
    }
    try {
      const initialResults = await movieModels.createMoviesAsync(movieData)
      if (initialResults.affectedRows > 0) {
        if (selectedGenre.length > 0) {
          await movieInfoModels.createBulkMovieInfo(initialResults.insertId, selectedGenre)
        }
        const movies = await movieModels.getMovieByIdWithGenreAsync(initialResults.insertId)
        const dataGenre = movies.map(item => item.genreName)
        await movieModels.insertGenreinMovie(initialResults.insertId, dataGenre)
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
            message: 'Failed to Create Movie'
          })
        }
      }
    } catch (error) {
      responseStatus.serverError(res)
    }
  })
}

exports.getDetailMovieById = async (req, res) => {
  const { id } = req.params
  try {
    const getMovieId = await movieModels.getMovieByIdAsync(id)
    const dataFinnaly = {
      id: getMovieId[0].id,
      language: getMovieId[0].language,
      genre: getMovieId[0].genre,
      director: getMovieId[0].director,
      actors: getMovieId[0].actors,
      title: getMovieId[0].title,
      synopsis: getMovieId[0].synopsis,
      relaseDate: getMovieId[0].relaseDate,
      runtime: getMovieId[0].runtime,
      poster: `${IP_URL_DEVICE}${APP_PORT}/${getMovieId[0].poster}`,
      price: getMovieId[0].price,
      createdAt: getMovieId[0].createdAt,
      updatedAt: getMovieId[0].updatedAt
    }
    if (getMovieId.length > 0) {
      return res.json({
        success: true,
        message: 'Detail Of Movie',
        results: dataFinnaly

      })
    }
    return res.status(400).json({
      success: false,
      message: 'Movie not exixts'
    })
  } catch (error) {
    responseStatus.serverError(res)
  }
}

exports.deleteMovie = async (req, res) => {
  const { id } = req.params
  try {
    const initialResult = await movieModels.getMovieById(id)
    if (initialResult.length > 0) {
      await movieModels.deleteMovieById(id)
      return res.json({
        success: true,
        message: 'Data deleted successfully',
        results: initialResult[0]
      })
    } else {
      return res.status(400).json({
        success: false,
        message: 'Failed to delete data, file not exist'
      })
    }
  } catch (error) {
    return res.status(405).json({
      success: false,
      message: "can't be delete, because child data is exist"
    })
  }
}

exports.updateMovie = (req, res) => {
  const { id } = req.params
  const data = req.body
  movieModels.getMovieById(id, initialResult => {
    if (initialResult.length > 0) {
      movieModels.updateMovie(id, data, results => {
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

exports.updateMoviee = (req, res) => {
  upload(req, res, async err => {
    const data = req.body
    const { id } = req.params
    const valueForm = Object.values(data).filter((items) => items === '')
    console.log(valueForm)
    if (valueForm[0] === '') {
      responseStatus.errorInputForm(res)
    }
    if (err instanceof multer.MulterError) {
      responseStatus.errorUploadPoster(res)
    } else if (err) {
      responseStatus.errorUploadPoster(res)
    }
    const selectedGenre = []
    if (typeof data.idGenre === 'object') {
      try {
        const results = await genreModels.checkGenreAsync(data.idGenre)
        if (results.length !== data.idGenre.length) {
          responseStatus.errorFindGenre(res)
        } else {
          results.forEach(item => {
            selectedGenre.push(item.id)
          })
        }
      } catch (error) {
        responseStatus.serverError(res)
      }
    } else if (typeof data.idGenre === 'string') {
      try {
        const results = await genreModels.checkGenreAsync(data.idGenre)
        if (results.length !== data.idGenre.length) {
          responseStatus.errorFindGenre(res)
        } else {
          results.forEach(item => {
            selectedGenre.push(item.id)
          })
        }
      } catch (error) {
        responseStatus.serverError(res)
      }
    }
    const movieData = {
      language: data.language,
      genre: data.genre,
      director: data.director,
      actors: data.actors,
      title: data.title,
      synopsis: data.synopsis,
      relaseDate: data.relaseDate,
      runtime: data.runtime,
      poster: `${req.file.destination}/${req.file.filename}` || null,
      price: data.price
    }

    try {
      await movieInfoModels.deleteGenre(id)
      const initialResults = await movieModels.updateMovie(id, movieData)
      if (initialResults.affectedRows > 0) {
        if (selectedGenre.length > 0) {
          await movieInfoModels.createBulkMovieInfo(id, selectedGenre)
        }
        const movies = await movieModels.getMovieByIdWithGenreAsync(id)
        const dataGenre = movies.map(item => item.genreName)
        await movieModels.insertGenreinMovie(id, dataGenre)
        if (movies.length > 0) {
          return res.json({
            success: true,
            message: 'Update Movie Successfully',
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
            message: 'Failed to Update Movie'
          })
        }
      }
    } catch (error) {
      responseStatus.serverError(res)
    }
  })
}

exports.listMoviesNowShow = async (req, res) => {
  const cond = req.query
  cond.search = cond.search || ''
  cond.page = Number(cond.page) || 1
  cond.limit = Number(cond.limit) || 5
  cond.dataLimit = cond.limit * cond.page
  cond.offset = (cond.page - 1) * cond.limit
  cond.sort = cond.sort || 'id'
  cond.order = cond.order || 'DESC'
  try {
    const date = new Date()
    const nowYear = date.getFullYear()
    const nowMonth = date.getMonth()
    const dateNow = `${nowYear}-0${nowMonth + 1}`
    const data = await movieModels.getMoviesByMonth(dateNow, cond)
    const dataFinnally = []
    for (let index = 0; index < data.length; index++) {
      const items = {
        id: data[index].id,
        language: data[index].language,
        genre: data[index].genre,
        director: data[index].director,
        actors: data[index].actors,
        title: data[index].title,
        synopsis: data[index].synopsis,
        relaseDate: data[index].relaseDate,
        runtime: data[index].runtime,
        poster: `${IP_URL_DEVICE}${APP_PORT}/${data[index].poster}`,
        price: data[index].price,
        createdAt: data[index].createdAt,
        updatedAt: data[index].updatedAt
      }
      dataFinnally.push(items)
    }
    const totalData = await movieModels.totalDataMovieByMonth(dateNow, cond)
    return res.json({
      success: true,
      message: 'List of all movies now show',
      results: dataFinnally,
      pageInfo: {
        totalData: totalData.length,
        totalDataInCurrentPage: data.length,
        totalPage: Math.ceil(totalData.length / cond.limit),
        currentPage: cond.page,
        nextLink: nextLink.nextLinkMoviesNowShow(cond, totalData, IP_URL_DEVICE, APP_PORT),
        prevLink: prevLink.prevLinkMovies(cond, totalData, IP_URL_DEVICE, APP_PORT)
      }
    })
  } catch (err) {
    responseStatus.serverError(res)
  }
}

// exports.detailMovies = (req, res) => {
//   const { id } = req.params
//   const result = data.filter((item) => item.id === Number(id))
//   return res.json({
//     success: result.length !== 0,
//     message: 'Details of Movie',
//     result
//   })
// }

// exports.ListMoviesByGenre = (req, res) => {
//   const { name } = req.params
//   const { page = 1, limit = LIMIT_DATA } = req.query
//   const paging = (Number(page) * limit) - limit
//   const offset = limit * Number(page)
//   const nextPage = ((Number(page) + 1) * limit) - limit
//   const nextOffset = limit * (Number(page) + 1)

//   let nextPageData = []
//   const totalDatas = data.filter((items) => items.genre.toLocaleLowerCase().includes(name.toLocaleLowerCase()))
//   const results = data.filter((items) => items.genre.toLocaleLowerCase().includes(name.toLocaleLowerCase())).slice(paging, offset)
//   nextPageData = data.filter((items) => items.genre.toLocaleLowerCase().includes(name.toLocaleLowerCase())).slice(nextPage, nextOffset)

//   return res.json({
//     success: results.length !== 0,
//     message: 'List of Genre',
//     results,
//     pageInfo: {
//       totalData: totalDatas.length,
//       totalDataInPage: results.length,
//       currentPage: Number(page),
//       nextLink: nextPageData.length > 0 ? `${APP_URL}/genre/${name}?page=${Number(page) + 1}` : null,
//       prevLink: page > 1 ? `${APP_URL}/genre/${name}?page=${page - 1}` : null
//     }
//   })
// }

// // exports.ListMoviesByCinema = (req, res) => {
// //   const { cinema } = req.params
// //   const { page = 1, limit = LIMIT_DATA } = req.query
// //   const paging = (Number(page) * limit) - limit
// //   const offset = limit * Number(page)
// //   const nextPage = ((Number(page) + 1) * limit) - limit
// //   const nextOffset = limit * (Number(page) + 1)
// //   let nextPageData = []
// //   const totalDatas = data.filter((items) => items.cinema.toLowerCase().includes(cinema.toLowerCase()))
// //   const results = data.filter((items) => items.cinema.toLowerCase().includes(cinema.toLowerCase())).slice(paging, offset)
// //   nextPageData = data.filter((items) => items.cinema.toLowerCase().includes(cinema.toLowerCase())).slice(nextPage, nextOffset)

// //   res.json({
// //     success: results.length !== 0,
// //     message: 'List of Cinemas',
// //     results,
// //     pageInfo: {
// //       totalData: totalDatas.length,
// //       totalDataInPage: results.length,
// //       currentPage: Number(page),
// //       nextLink: nextPageData.length > 0 ? `${APP_URL}/cinemas/${cinema}?page=${Number(page) + 1}` : null,
// //       prevLink: page > 1 ? `${APP_URL}/cinemas/${cinema}?page=${page - 1}` : null
// //     }
// //   })
// // }

// // exports.DetailMoviesByCinema = (req, res) => {
// //   const { cinema, id } = req.params
// //   console.log(id)
// //   const getCinema = data.filter((items) => items.cinema.toLowerCase().includes(cinema.toLowerCase()))
// //   const result = getCinema.filter((item) => item.id === Number(id))
// //   return res.json({
// //     success: result.length !== 0,
// //     message: 'Details of Movie by Cinema',
// //     result
// //   })
// // }

// exports.getMoviesByAdmin = (req, res) => {
//   const { page = 1, limit = LIMIT_DATA, search = null } = req.query
//   const paging = (Number(page) * limit) - limit
//   const offset = limit * Number(page)
//   const nextPage = ((Number(page) + 1) * limit) - limit
//   const nextOffset = limit * (Number(page) + 1)
//   let nextPageData = []
//   let results = []
//   if (search) {
//     results = data.filter((items) => items.name.toLowerCase().includes(search.toLowerCase())).slice(paging, offset)
//   } else {
//     nextPageData = data.slice(nextPage, nextOffset)
//     results = data.slice(paging, offset)
//   }

//   return res.json({
//     success: results.length !== 0,
//     message: 'List of Movies by Admin',
//     results,
//     pageInfo: {
//       totalData: results.length,
//       currentPage: Number(page),
//       nextLink: nextPageData.length > 0 ? `${APP_URL}/admin/movies?page=${Number(page) + 1}` : null,
//       prevLink: page > 1 ? `${APP_URL}/admin/movies?page=${page - 1}` : null
//     }
//   })
// }

// exports.detailMovieByAdmin = (req, res) => {
//   const { id } = req.params
//   const result = data.filter((item) => item.id === Number(id))
//   return res.json({
//     success: result.length !== 0,
//     message: 'Details of Movie by Admin',
//     result
//   })
// }

// exports.postMovieByAdmin = (req, res) => {
//   const { language, genre, director, actors, name, synopsis, relaseDate, runtime, popularity, poster, cinema } = req.body
//   const newListMovie = [
//     ...data,
//     {
//       id: data.length + 1,
//       language: language,
//       genre: genre,
//       director: director,
//       actors: actors,
//       name: name,
//       synopsis: synopsis,
//       relaseDate: relaseDate,
//       runtime: runtime,
//       popularity: popularity,
//       poster: poster,
//       cinema: cinema
//     }
//   ]
//   const results = newListMovie

//   return res.json({
//     success: results.length !== 0,
//     message: 'Success Add Movie',
//     results: results[results.length - 1]
//   })
// }

// exports.putMovieByAdmin = (req, res) => {
//   const { id } = req.params
//   const { language, genre, director, actors, name, synopsis, relaseDate, runtime, popularity, poster, cinema } = req.body
//   const results = data.filter((item) => item.id === Number(id))
//   const newData = results.map(e => e)
//   newData[0].id = id
//   newData[0].language = language
//   newData[0].genre = genre
//   newData[0].director = director
//   newData[0].actors = actors
//   newData[0].name = name
//   newData[0].synopsis = synopsis
//   newData[0].relaseDate = relaseDate
//   newData[0].runtime = runtime
//   newData[0].popularity = popularity
//   newData[0].poster = poster
//   newData[0].cinema = cinema

//   return res.json({
//     success: true,
//     message: `Success Updated Movie On Id ${id}`,
//     result: newData
//   })
// }

// exports.patchMovieByAdmin = (req, res) => {
//   const { id } = req.params
//   const {
//     language = data[id].language,
//     genre = data[id].genre,
//     director = data[id].director,
//     actors = data[id].actors,
//     name = data[id].name,
//     synopsis = data[id].synopsis,
//     relaseDate = data[id].relaseDate,
//     runtime = data[id].runtime,
//     popularity = data[id].popularity,
//     poster = data[id].poster,
//     cinema = data[id].cinema
//   } = req.body
//   const results = data.filter((item) => item.id === Number(id))
//   const newData = results.map(e => e)
//   newData[0].language = language
//   newData[0].genre = genre
//   newData[0].director = director
//   newData[0].actors = actors
//   newData[0].name = name
//   newData[0].synopsis = synopsis
//   newData[0].relaseDate = relaseDate
//   newData[0].runtime = runtime
//   newData[0].popularity = popularity
//   newData[0].poster = poster
//   newData[0].cinema = cinema

//   return res.json({
//     success: true,
//     message: `Successfully Patching Data on Id ${id}`,
//     result: newData
//   })
// }

// exports.deleteMovieByAdmin = (req, res) => {
//   const { id } = req.params
//   const { page = 1, limit = LIMIT_DATA } = req.query
//   const paging = (Number(page) * limit) - limit
//   const offset = limit * Number(page)
//   const nextPage = ((Number(page) + 1) * limit) - limit
//   const nextOffset = limit * (Number(page) + 1)
//   const results = data.filter(items => items.id !== Number(id)).slice(paging, offset)
//   let nextPageData = []
//   nextPageData = data.slice(nextPage, nextOffset)
//   res.json({
//     success: true,
//     message: `Success Delete Movie on Id ${id}`,
//     results,
//     pageInfo: {
//       totalData: results.length,
//       currentPage: Number(page),
//       nextLink: nextPageData.length > 0 ? `${APP_URL}/admin/movies?page=${Number(page) + 1}` : null,
//       prevLink: page > 1 ? `${APP_URL}/admin/movies?page=${page - 1}` : null
//     }
//   })
// }
