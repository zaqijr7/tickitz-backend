const genreModels = require('../models/genres')
const nextLink = require('../middlewares/nextLink')
const prevLink = require('../middlewares/prevLink')
const { APP_URL, APP_PORT } = process.env

exports.createGenre = (req, res) => {
  const data = req.body
  const valueForm = Object.values(data).filter((items) => items === '')
  if (valueForm[0] === '') {
    return res.status(400).json({
      success: false,
      message: 'Form data cannot be empty',
      results: []
    })
  }
  genreModels.createGenre(data, (results) => {
    if (results.affectedRows > 0) {
      genreModels.getGenreByid(results.insertId, (finalResult) => {
        if (finalResult.length > 0) {
          return res.json({
            success: true,
            message: 'Created Genre Successfully',
            results: finalResult[0]
          })
        } else {
          return res.status(400).json({
            success: false,
            message: 'Failed to Create Genre'
          })
        }
      })
    }
  })
}

exports.getDetailGenre = (req, res) => {
  const { id } = req.params
  genreModels.getGenreByid(id, results => {
    if (results.length > 0) {
      return res.json({
        success: true,
        message: 'Detail Of Genre',
        results: results[0]
      })
    }
    return res.status(400).json({
      success: false,
      message: 'Genre not exixts'
    })
  })
}

exports.listAllGenre = (req, res) => {
  const cond = req.query
  cond.search = cond.search || ''
  cond.page = Number(cond.page) || 1
  cond.limit = Number(cond.limit) || 5
  cond.dataLimit = cond.limit * cond.page
  cond.offset = (cond.page - 1) * cond.limit
  cond.sort = cond.sort || 'id'
  cond.order = cond.order || 'ASC'

  genreModels.getGenreByCondition(cond, results => {
    genreModels.totalDataGenre(cond, totalData => {
      return res.json({
        success: true,
        message: 'List of all Genre',
        results,
        pageInfo: {
          totalData: totalData.length,
          totalDataInCurrentPage: results.length,
          nextLink: nextLink.nextLinkGenre(cond, totalData, APP_URL, APP_PORT),
          prevLink: prevLink.prevLinkGenre(cond, totalData, APP_URL, APP_PORT)
        }
      })
    })
  })
}

exports.deleteGenre = async (req, res) => {
  const { id } = req.params
  genreModels.getGenreByid(id, (initialResult) => {
    if (initialResult.length > 0) {
      genreModels.deleteGenreById(id, results => {
        return res.json({
          success: true,
          message: 'Data deleted successfully',
          results: initialResult[0]
        })
      })
    } else {
      return res.json({
        success: false,
        message: 'Failed to delete data'
      })
    }
  })
}

exports.updateGenre = (req, res) => {
  const { id } = req.params
  const data = req.body
  genreModels.getGenreByid(id, initialResult => {
    if (initialResult.length > 0) {
      genreModels.updateGenre(id, data, results => {
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
      return res.json({
        success: false,
        message: 'Failed to update data'
      })
    }
  })
}

// const { LIMIT_DATA, APP_URL } = process.env
// const data = require('../helpers/listGenre')

// exports.listGenre = (req, res) => {
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
//     message: 'List of Genre',
//     results,
//     pageInfo: {
//       totalData: results.length,
//       currentPage: Number(page),
//       nextLink: nextPageData.length > 0 ? `${APP_URL}/admin/genre?page=${Number(page) + 1}` : null,
//       prevLink: page > 1 ? `${APP_URL}/admin/genre?page=${page - 1}` : null
//     }
//   })
// }

// exports.DetailGenre = (req, res) => {
//   const { id } = req.params
//   const result = data.filter((item) => item.id === Number(id))
//   return res.json({
//     success: result.length !== 0,
//     message: 'Details of Genre',
//     result
//   })
// }

// exports.PostGenreByAdmin = (req, res) => {
//   const { name } = req.body
//   const newListGenre = [
//     ...data,
//     {
//       id: data.length + 1,
//       name: name
//     }
//   ]
//   const results = newListGenre

//   return res.json({
//     success: results.length !== 0,
//     message: 'Success Add Genre',
//     results: results[results.length - 1]
//   })
// }

// exports.PutGenreByAdmin = (req, res) => {
//   const { id } = req.params
//   const { name } = req.body
//   const results = data.filter((item) => item.id === Number(id))
//   const newData = results.map(e => e)
//   newData[0].name = name
//   return res.json({
//     success: true,
//     message: `Success Updated Genre On Id ${id}`,
//     result: newData
//   })
// }

// exports.PatchGenreByAdmin = (req, res) => {
//   const { id } = req.params
//   const { name = data[id].name } = req.body
//   const results = data.filter((item) => item.id === Number(id))
//   const newData = results.map(e => e)
//   newData[0].name = name
//   return res.json({
//     success: true,
//     message: `Successfully Patching Data Genere on Id ${id}`,
//     result: newData
//   })
// }

// exports.DeleteGenreByAdmin = (req, res) => {
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
//     message: `Success Delete Genre on Id ${id}`,
//     results,
//     pageInfo: {
//       totalData: results.length,
//       currentPage: Number(page),
//       nextLink: nextPageData.length > 0 ? `${APP_URL}/admin/genre?page=${Number(page) + 1}` : null,
//       prevLink: page > 1 ? `${APP_URL}/admin/genre?page=${page - 1}` : null
//     }
//   })
// }
