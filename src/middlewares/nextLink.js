exports.nextLinkMovies = (cond, totalData, url, port) => {
  if (cond.search.length > 0 && cond.dataLimit < totalData.length) {
    return `${url}${port}/admin/movies?limit=${cond.limit}&search=${cond.search}&page=${cond.page + 1}`
  } else if (cond.dataLimit < totalData.length) {
    return `${url}${port}/admin/movies?limit=${cond.limit}&page=${cond.page + 1}`
  } else {
    return null
  }
}

exports.nextLinkCinema = (cond, totalData, url, port) => {
  if (cond.search.length > 0 && cond.dataLimit < totalData.length) {
    return `${url}${port}/admin/cinemas?limit=${cond.limit}&search=${cond.search}&page=${cond.page + 1}`
  } else if (cond.dataLimit < totalData.length) {
    return `${url}${port}/admin/cinemas?limit=${cond.limit}&page=${cond.page + 1}`
  } else {
    return null
  }
}

exports.nextLinkGenre = (cond, totalData, url, port) => {
  if (cond.search.length > 0 && cond.dataLimit < totalData.length) {
    return `${url}${port}/admin/genre?limit=${cond.limit}&search=${cond.search}&page=${cond.page + 1}`
  } else if (cond.dataLimit < totalData.length) {
    return `${url}${port}/admin/genre?limit=${cond.limit}&page=${cond.page + 1}`
  } else {
    return null
  }
}

exports.nextLinkSeat = (cond, totalData, url, port) => {
  if (cond.search.length > 0 && cond.dataLimit < totalData.length) {
    return `${url}${port}/admin/seat?limit=${cond.limit}&search=${cond.search}&page=${cond.page + 1}`
  } else if (cond.dataLimit < totalData.length) {
    return `${url}${port}/admin/seat?limit=${cond.limit}&page=${cond.page + 1}`
  } else {
    return null
  }
}

exports.nextLinkShowTime = (cond, totalData, url, port) => {
  if (cond.search.length > 0 && cond.dataLimit < totalData.length) {
    return `${url}${port}/admin/shw-time?limit=${cond.limit}&search=${cond.search}&page=${cond.page + 1}`
  } else if (cond.dataLimit < totalData.length) {
    return `${url}${port}/admin/shw-time?limit=${cond.limit}&page=${cond.page + 1}`
  } else {
    return null
  }
}

exports.nextLinkMoviesNowShow = (cond, totalData, url, port) => {
  if (cond.dataLimit < totalData.length) {
    return `${url}${port}/nowshow?search=${cond.search}&page=${cond.page + 1}&limit=${cond.limit}&sort=${cond.sort}&order=${cond.order}`
  } else {
    return null
  }
}

exports.nextLinkSchedule = (cond, totalData, url, port) => {
  if (cond.dataLimit < totalData.length) {
    return `${url}${port}/schedule?limit=${cond.limit}&page=${cond.page + 1}`
  } else {
    return null
  }
}
