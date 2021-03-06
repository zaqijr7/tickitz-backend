exports.prevLinkMovies = (cond, totalData, url, port) => {
  if (cond.page > 1) {
    return `${url}${port}/nowshow?search=${cond.search}&page=${cond.page - 1}&limit=${cond.limit}&sort=${cond.sort}&order=${cond.order}`
  } else {
    return null
  }
}

exports.prevLinkCinema = (cond, totalData, url, port) => {
  if (cond.search.length > 0 && cond.page > 1) {
    return `${url}${port}/admin/cinemas?limit=${cond.limit}&search=${cond.search}&page=${cond.page - 1}`
  } else if (cond.page > 1) {
    return `${url}${port}/admin/cinemas?limit=${cond.limit}&page=${cond.page - 1}`
  } else {
    return null
  }
}

exports.prevLinkGenre = (cond, totalData, url, port) => {
  if (cond.search.length > 0 && cond.page > 1) {
    return `${url}${port}/admin/genre?limit=${cond.limit}&search=${cond.search}&page=${cond.page - 1}`
  } else if (cond.page > 1) {
    return `${url}${port}/admin/genre?limit=${cond.limit}&page=${cond.page - 1}`
  } else {
    return null
  }
}

exports.prevLinkSeat = (cond, totalData, url, port) => {
  if (cond.search.length > 0 && cond.page > 1) {
    return `${url}${port}/admin/seat?limit=${cond.limit}&search=${cond.search}&page=${cond.page - 1}`
  } else if (cond.page > 1) {
    return `${url}${port}/admin/seat?limit=${cond.limit}&page=${cond.page - 1}`
  } else {
    return null
  }
}

exports.prevLinkShowTime = (cond, totalData, url, port) => {
  if (cond.search.length > 0 && cond.page > 1) {
    return `${url}${port}/admin/shw-time?limit=${cond.limit}&search=${cond.search}&page=${cond.page - 1}`
  } else if (cond.page > 1) {
    return `${url}${port}/admin/shw-time?limit=${cond.limit}&page=${cond.page - 1}`
  } else {
    return null
  }
}

exports.prevLinkSchedule = (cond, totalData, url, port) => {
  if (cond.page > 1) {
    return `${url}${port}/schedule?limit=${cond.limit}&page=${cond.page - 1}`
  } else {
    return null
  }
}
