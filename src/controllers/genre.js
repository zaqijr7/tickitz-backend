const { LIMIT_DATA, APP_URL } = process.env
const data = require('../helpers/listGenre')

exports.listGenre = (req, res) => {
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
    message: 'List of Genre',
    results,
    pageInfo: {
      totalData: results.length,
      currentPage: Number(page),
      nextLink: nextPageData.length > 0 ? `${APP_URL}/admin/genre?page=${Number(page) + 1}` : null,
      prevLink: page > 1 ? `${APP_URL}/admin/genre?page=${page - 1}` : null
    }
  })
}

exports.DetailGenre = (req, res) => {
  const { id } = req.params
  const result = data.filter((item) => item.id === Number(id))
  return res.json({
    success: result.length !== 0,
    message: 'Details of Genre',
    result
  })
}

exports.PostGenreByAdmin = (req, res) => {
  const { name } = req.body
  const newListGenre = [
    ...data,
    {
      id: data.length + 1,
      name: name
    }
  ]
  const results = newListGenre

  return res.json({
    success: results.length !== 0,
    message: 'Success Add Genre',
    results: results[results.length - 1]
  })
}

exports.PutGenreByAdmin = (req, res) => {
  const { id } = req.params
  const { name } = req.body
  const results = data.filter((item) => item.id === Number(id))
  const newData = results.map(e => e)
  newData[0].name = name
  return res.json({
    success: true,
    message: `Success Updated Genre On Id ${id}`,
    result: newData
  })
}

exports.PatchGenreByAdmin = (req, res) => {
  const { id } = req.params
  const { name = data[id].name } = req.body
  const results = data.filter((item) => item.id === Number(id))
  const newData = results.map(e => e)
  newData[0].name = name
  return res.json({
    success: true,
    message: `Successfully Patching Data Genere on Id ${id}`,
    result: newData
  })
}

exports.DeleteGenreByAdmin = (req, res) => {
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
    message: `Success Delete Genre on Id ${id}`,
    results,
    pageInfo: {
      totalData: results.length,
      currentPage: Number(page),
      nextLink: nextPageData.length > 0 ? `${APP_URL}/admin/genre?page=${Number(page) + 1}` : null,
      prevLink: page > 1 ? `${APP_URL}/admin/genre?page=${page - 1}` : null
    }
  })
}
