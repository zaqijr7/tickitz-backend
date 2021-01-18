const { LIMIT_DATA, APP_URL } = process.env
const data = require('../helpers/listMovies')

exports.listMovies = (req, res) => {
  const { page = 1, limit = LIMIT_DATA, search = null } = req.query
  const paging = (Number(page) * limit) - limit
  const offset = limit * Number(page)
  const nextPage = ((Number(page) + 1) * limit) - limit
  const nextOffset = limit * (Number(page) + 1)
  let nextPageData = []
  let results = []
  if (search) {
    results = data.filter((items) => items.name.toLowerCase().includes(search.toLowerCase())).slice(paging, offset)
  } else {
    nextPageData = data.slice(nextPage, nextOffset)
    results = data.slice(paging, offset)
  }

  return res.json({
    success: results.length !== 0,
    message: 'List of Movies',
    results,
    pageInfo: {
      totalData: results.length,
      currentPage: Number(page),
      nextLink: nextPageData.length > 0 ? `${APP_URL}/movies?page=${Number(page) + 1}` : null,
      prevLink: page > 1 ? `${APP_URL}/movies?page=${page - 1}` : null
    }
  })
}

exports.detailMovies = (req, res) => {
  const { id } = req.params
  const result = data.filter((item) => item.id === Number(id))
  return res.json({
    success: result.length !== 0,
    message: 'Details of Movie',
    result
  })
}

exports.ListMoviesByGenre = (req, res) => {
  const { name } = req.params
  const { page = 1, limit = LIMIT_DATA } = req.query
  const paging = (Number(page) * limit) - limit
  const offset = limit * Number(page)
  const nextPage = ((Number(page) + 1) * limit) - limit
  const nextOffset = limit * (Number(page) + 1)

  let nextPageData = []
  const totalDatas = data.filter((items) => items.genre.toLocaleLowerCase().includes(name.toLocaleLowerCase()))
  const results = data.filter((items) => items.genre.toLocaleLowerCase().includes(name.toLocaleLowerCase())).slice(paging, offset)
  nextPageData = data.filter((items) => items.genre.toLocaleLowerCase().includes(name.toLocaleLowerCase())).slice(nextPage, nextOffset)

  return res.json({
    success: results.length !== 0,
    message: 'List of Genre',
    results,
    pageInfo: {
      totalData: totalDatas.length,
      totalDataInPage: results.length,
      currentPage: Number(page),
      nextLink: nextPageData.length > 0 ? `${APP_URL}/genre/${name}?page=${Number(page) + 1}` : null,
      prevLink: page > 1 ? `${APP_URL}/genre/${name}?page=${page - 1}` : null
    }
  })
}

// exports.ListMoviesByCinema = (req, res) => {
//   const { cinema } = req.params
//   const { page = 1, limit = LIMIT_DATA } = req.query
//   const paging = (Number(page) * limit) - limit
//   const offset = limit * Number(page)
//   const nextPage = ((Number(page) + 1) * limit) - limit
//   const nextOffset = limit * (Number(page) + 1)
//   let nextPageData = []
//   const totalDatas = data.filter((items) => items.cinema.toLowerCase().includes(cinema.toLowerCase()))
//   const results = data.filter((items) => items.cinema.toLowerCase().includes(cinema.toLowerCase())).slice(paging, offset)
//   nextPageData = data.filter((items) => items.cinema.toLowerCase().includes(cinema.toLowerCase())).slice(nextPage, nextOffset)

//   res.json({
//     success: results.length !== 0,
//     message: 'List of Cinemas',
//     results,
//     pageInfo: {
//       totalData: totalDatas.length,
//       totalDataInPage: results.length,
//       currentPage: Number(page),
//       nextLink: nextPageData.length > 0 ? `${APP_URL}/cinemas/${cinema}?page=${Number(page) + 1}` : null,
//       prevLink: page > 1 ? `${APP_URL}/cinemas/${cinema}?page=${page - 1}` : null
//     }
//   })
// }

// exports.DetailMoviesByCinema = (req, res) => {
//   const { cinema, id } = req.params
//   console.log(id)
//   const getCinema = data.filter((items) => items.cinema.toLowerCase().includes(cinema.toLowerCase()))
//   const result = getCinema.filter((item) => item.id === Number(id))
//   return res.json({
//     success: result.length !== 0,
//     message: 'Details of Movie by Cinema',
//     result
//   })
// }

exports.getMoviesByAdmin = (req, res) => {
  const { page = 1, limit = LIMIT_DATA, search = null } = req.query
  const paging = (Number(page) * limit) - limit
  const offset = limit * Number(page)
  const nextPage = ((Number(page) + 1) * limit) - limit
  const nextOffset = limit * (Number(page) + 1)
  let nextPageData = []
  let results = []
  if (search) {
    results = data.filter((items) => items.name.toLowerCase().includes(search.toLowerCase())).slice(paging, offset)
  } else {
    nextPageData = data.slice(nextPage, nextOffset)
    results = data.slice(paging, offset)
  }

  return res.json({
    success: results.length !== 0,
    message: 'List of Movies by Admin',
    results,
    pageInfo: {
      totalData: results.length,
      currentPage: Number(page),
      nextLink: nextPageData.length > 0 ? `${APP_URL}/admin/movies?page=${Number(page) + 1}` : null,
      prevLink: page > 1 ? `${APP_URL}/admin/movies?page=${page - 1}` : null
    }
  })
}

exports.detailMovieByAdmin = (req, res) => {
  const { id } = req.params
  const result = data.filter((item) => item.id === Number(id))
  return res.json({
    success: result.length !== 0,
    message: 'Details of Movie by Admin',
    result
  })
}

exports.postMovieByAdmin = (req, res) => {
  const { language, genre, director, actors, name, synopsis, relaseDate, runtime, popularity, poster, cinema } = req.body
  const newListMovie = [
    ...data,
    {
      id: data.length + 1,
      language: language,
      genre: genre,
      director: director,
      actors: actors,
      name: name,
      synopsis: synopsis,
      relaseDate: relaseDate,
      runtime: runtime,
      popularity: popularity,
      poster: poster,
      cinema: cinema
    }
  ]
  const results = newListMovie

  return res.json({
    success: results.length !== 0,
    message: 'Success Add Movie',
    results: results[results.length - 1]
  })
}

exports.putMovieByAdmin = (req, res) => {
  const { id } = req.params
  const { language, genre, director, actors, name, synopsis, relaseDate, runtime, popularity, poster, cinema } = req.body
  const results = data.filter((item) => item.id === Number(id))
  const newData = results.map(e => e)
  newData[0].id = id
  newData[0].language = language
  newData[0].genre = genre
  newData[0].director = director
  newData[0].actors = actors
  newData[0].name = name
  newData[0].synopsis = synopsis
  newData[0].relaseDate = relaseDate
  newData[0].runtime = runtime
  newData[0].popularity = popularity
  newData[0].poster = poster
  newData[0].cinema = cinema

  return res.json({
    success: true,
    message: `Success Updated Movie On Id ${id}`,
    result: newData
  })
}

exports.patchMovieByAdmin = (req, res) => {
  const { id } = req.params
  const {
    language = data[id].language,
    genre = data[id].genre,
    director = data[id].director,
    actors = data[id].actors,
    name = data[id].name,
    synopsis = data[id].synopsis,
    relaseDate = data[id].relaseDate,
    runtime = data[id].runtime,
    popularity = data[id].popularity,
    poster = data[id].poster,
    cinema = data[id].cinema
  } = req.body
  const results = data.filter((item) => item.id === Number(id))
  const newData = results.map(e => e)
  newData[0].language = language
  newData[0].genre = genre
  newData[0].director = director
  newData[0].actors = actors
  newData[0].name = name
  newData[0].synopsis = synopsis
  newData[0].relaseDate = relaseDate
  newData[0].runtime = runtime
  newData[0].popularity = popularity
  newData[0].poster = poster
  newData[0].cinema = cinema

  return res.json({
    success: true,
    message: `Successfully Patching Data on Id ${id}`,
    result: newData
  })
}

exports.deleteMovieByAdmin = (req, res) => {
  const { id } = req.params
  const { page = 1, limit = LIMIT_DATA } = req.query
  const paging = (Number(page) * limit) - limit
  const offset = limit * Number(page)
  const nextPage = ((Number(page) + 1) * limit) - limit
  const nextOffset = limit * (Number(page) + 1)
  const results = data.filter(items => items.id !== Number(id)).slice(paging, offset)
  let nextPageData = []
  nextPageData = data.slice(nextPage, nextOffset)
  res.json({
    success: true,
    message: `Success Delete Movie on Id ${id}`,
    results,
    pageInfo: {
      totalData: results.length,
      currentPage: Number(page),
      nextLink: nextPageData.length > 0 ? `${APP_URL}/admin/movies?page=${Number(page) + 1}` : null,
      prevLink: page > 1 ? `${APP_URL}/admin/movies?page=${page - 1}` : null
    }
  })
}
