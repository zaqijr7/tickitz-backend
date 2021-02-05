const cinemaModels = require('../models/cinemas')
const upload = require('../helpers/uploads').single('logo')
const multer = require('multer')
const nextLink = require('../middlewares/nextLink')
const prevLink = require('../middlewares/prevLink')
const responseStatus = require('../helpers/responseStatus')
const { APP_URL, APP_PORT } = process.env

exports.createCinema = async (req, res) => {
  upload(req, res, async err => {
    const data = req.body
    const a = Object.values(data).filter((items) => items === '')
    if (a[0] === '') {
      return res.status(400).json({
        success: false,
        message: 'Form data cannot be empty',
        results: []
      })
    }
    if (err instanceof multer.MulterError) {
      responseStatus.errorUploadPoster(res)
    } else if (err) {
      responseStatus.errorUploadPoster(res)
    }

    try {
      const dataCinema = {
        name: data.name,
        city: data.city,
        address: data.address,
        phone: data.phone,
        logo: `${APP_URL}${APP_PORT}/${req.file.destination}/${req.file.filename}` || null
      }
      const results = await cinemaModels.createCinema(dataCinema)
      if (results.affectedRows > 0) {
        const finalResult = await cinemaModels.getCinemaById(results.insertId)
        if (finalResult.length > 0) {
          return res.json({
            success: true,
            message: 'Created Cinema Successfully',
            results: finalResult[0]
          })
        }
      }
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'Failed to Create Cinema'
      })
    }
  })
}

exports.getDetailCinema = async (req, res) => {
  const { id } = req.params
  try {
    const results = await cinemaModels.getCinemaById(id)
    if (results.length > 0) {
      return res.status(200).json({
        success: true,
        message: 'Detail Of Cinema',
        results: results[0]
      })
    }
    return res.status(400).json({
      success: false,
      message: 'Cinema not exixts'
    })
  } catch (error) {
    responseStatus.serverError(res)
  }
}

exports.listAllCinema = async (req, res) => {
  const cond = req.query
  cond.search = cond.search || ''
  cond.page = Number(cond.page) || 1
  cond.limit = Number(cond.limit) || 5
  cond.dataLimit = cond.limit * cond.page
  cond.offset = (cond.page - 1) * cond.limit
  cond.sort = cond.sort || 'id'
  cond.order = cond.order || 'ASC'
  try {
    const results = await cinemaModels.getCinemaByCondition(cond)
    const totalData = await cinemaModels.totalDataCinema(cond)
    return res.json({
      success: true,
      message: 'List of all Cinema',
      results,
      pageInfo: {
        totalData: totalData.length,
        totalDataInCurrentPage: results.length,
        nextLink: nextLink.nextLinkCinema(cond, totalData, APP_URL, APP_PORT),
        prevLink: prevLink.prevLinkCinema(cond, totalData, APP_URL, APP_PORT)
      }
    })
  } catch (error) {
    responseStatus.serverError(res)
  }
}

exports.deleteMovie = async (req, res) => {
  const { id } = req.params
  try {
    const initialResult = await cinemaModels.getCinemaById(id)
    if (initialResult.length > 0) {
      await cinemaModels.deleteCinemaById(id)
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

exports.updateCinema = async (req, res) => {
  const { id } = req.params
  const data = req.body
  try {
    const initialResult = await cinemaModels.getCinemaById(id)
    if (initialResult.length > 0) {
      await cinemaModels.updateCinema(id, data)
      return res.json({
        success: true,
        message: 'Update data success',
        results: {
          ...initialResult[0],
          ...data
        }
      })
    }
  } catch (error) {
    return res.json({
      success: false,
      message: 'Failed to update data'
    })
  }
}

// exports.ListCinemas = (req, res) => {
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
//     message: 'List of Cinema',
//     results,
//     pageInfo: {
//       totalData: results.length,
//       currentPage: Number(page),
//       nextLink: nextPageData.length > 0 ? `${APP_URL}/cinemas?page=${Number(page) + 1}` : null,
//       prevLink: page > 1 ? `${APP_URL}/cinemas?page=${page - 1}` : null
//     }
//   })
// }

// exports.DetailCinema = (req, res) => {
//   const { id } = req.params
//   const result = data.filter((item) => item.id === Number(id))
//   return res.json({
//     success: result.length !== 0,
//     message: 'Details of Cinema',
//     result
//   })
// }

// exports.getCinemasByAdmin = (req, res) => {
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
//     message: 'List of Cinema By Admin',
//     results,
//     pageInfo: {
//       totalData: results.length,
//       currentPage: Number(page),
//       nextLink: nextPageData.length > 0 ? `${APP_URL}/cinemas?page=${Number(page) + 1}` : null,
//       prevLink: page > 1 ? `${APP_URL}/cinemas?page=${page - 1}` : null
//     }
//   })
// }

// exports.DetailCinemaByAdmin = (req, res) => {
//   const { id } = req.params
//   const result = data.filter((item) => item.id === Number(id))
//   return res.json({
//     success: result.length !== 0,
//     message: 'Details of Cinema By Admin',
//     result
//   })
// }

// exports.PostCinemaByAdmin = (req, res) => {
//   const { name, city, address, phone } = req.body
//   const newListCinema = [
//     ...data,
//     {
//       id: data.length + 1,
//       name: name,
//       city: city,
//       address: address,
//       phone: phone
//     }
//   ]
//   const results = newListCinema

//   return res.json({
//     success: results.length !== 0,
//     message: 'Success Add Cinema',
//     results: results[results.length - 1]
//   })
// }

// exports.PutCinemaByAdmin = (req, res) => {
//   const { id } = req.params
//   const { name, city, address, phone } = req.body
//   const results = data.filter((item) => item.id === Number(id))
//   const newData = results.map(e => e)
//   newData[0].name = name
//   newData[0].city = city
//   newData[0].address = address
//   newData[0].phone = phone

//   return res.json({
//     success: true,
//     message: `Success Updated Cinema On Id ${id}`,
//     result: newData
//   })
// }

// exports.patchCinemaByAdmin = (req, res) => {
//   const { id } = req.params
//   const {
//     name = data[id].name,
//     city = data[id].city,
//     address = data[id].address,
//     phone = data[id].phone
//   } = req.body
//   const results = data.filter((item) => item.id === Number(id))
//   const newData = results.map(e => e)
//   newData[0].name = name
//   newData[0].city = city
//   newData[0].address = address
//   newData[0].phone = phone

//   return res.json({
//     success: true,
//     message: `Successfully Patching Data Cinema on Id ${id}`,
//     result: newData
//   })
// }

// exports.deleteCinemaByAdmin = (req, res) => {
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
//     message: `Success Delete Cinema on Id ${id}`,
//     results,
//     pageInfo: {
//       totalData: results.length,
//       currentPage: Number(page),
//       nextLink: nextPageData.length > 0 ? `${APP_URL}/admin/cinemas?page=${Number(page) + 1}` : null,
//       prevLink: page > 1 ? `${APP_URL}/admin/cinemas?page=${page - 1}` : null
//     }
//   })
// }
