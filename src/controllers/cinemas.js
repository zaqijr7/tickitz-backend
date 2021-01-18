const { LIMIT_DATA, APP_URL } = process.env
const data = require('../helpers/listCinemas')

exports.ListCinemas = (req, res) => {
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
    message: 'List of Cinema',
    results,
    pageInfo: {
      totalData: results.length,
      currentPage: Number(page),
      nextLink: nextPageData.length > 0 ? `${APP_URL}/cinemas?page=${Number(page) + 1}` : null,
      prevLink: page > 1 ? `${APP_URL}/cinemas?page=${page - 1}` : null
    }
  })
}

exports.DetailCinema = (req, res) => {
  const { id } = req.params
  const result = data.filter((item) => item.id === Number(id))
  return res.json({
    success: result.length !== 0,
    message: 'Details of Cinema',
    result
  })
}

exports.getCinemasByAdmin = (req, res) => {
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
    message: 'List of Cinema By Admin',
    results,
    pageInfo: {
      totalData: results.length,
      currentPage: Number(page),
      nextLink: nextPageData.length > 0 ? `${APP_URL}/cinemas?page=${Number(page) + 1}` : null,
      prevLink: page > 1 ? `${APP_URL}/cinemas?page=${page - 1}` : null
    }
  })
}

exports.DetailCinemaByAdmin = (req, res) => {
  const { id } = req.params
  const result = data.filter((item) => item.id === Number(id))
  return res.json({
    success: result.length !== 0,
    message: 'Details of Cinema By Admin',
    result
  })
}

exports.PostCinemaByAdmin = (req, res) => {
  const { name, city, address, phone } = req.body
  const newListCinema = [
    ...data,
    {
      id: data.length + 1,
      name: name,
      city: city,
      address: address,
      phone: phone
    }
  ]
  const results = newListCinema

  return res.json({
    success: results.length !== 0,
    message: 'Success Add Cinema',
    results: results[results.length - 1]
  })
}

exports.PutCinemaByAdmin = (req, res) => {
  const { id } = req.params
  const { name, city, address, phone } = req.body
  const results = data.filter((item) => item.id === Number(id))
  const newData = results.map(e => e)
  newData[0].name = name
  newData[0].city = city
  newData[0].address = address
  newData[0].phone = phone

  return res.json({
    success: true,
    message: `Success Updated Cinema On Id ${id}`,
    result: newData
  })
}

exports.patchCinemaByAdmin = (req, res) => {
  const { id } = req.params
  const {
    name = data[id].name,
    city = data[id].city,
    address = data[id].address,
    phone = data[id].phone
  } = req.body
  const results = data.filter((item) => item.id === Number(id))
  const newData = results.map(e => e)
  newData[0].name = name
  newData[0].city = city
  newData[0].address = address
  newData[0].phone = phone

  return res.json({
    success: true,
    message: `Successfully Patching Data Cinema on Id ${id}`,
    result: newData
  })
}

exports.deleteCinemaByAdmin = (req, res) => {
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
    message: `Success Delete Cinema on Id ${id}`,
    results,
    pageInfo: {
      totalData: results.length,
      currentPage: Number(page),
      nextLink: nextPageData.length > 0 ? `${APP_URL}/admin/cinemas?page=${Number(page) + 1}` : null,
      prevLink: page > 1 ? `${APP_URL}/admin/cinemas?page=${page - 1}` : null
    }
  })
}
