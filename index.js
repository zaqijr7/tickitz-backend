const express = require('express')
const BodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()
const { APP_PORT } = process.env

const app = express()

app.use(BodyParser.urlencoded())
app.use(morgan('dev'))
app.use(cors('*'))

app.use('/uploads', express.static('uploads'))
app.use('/auth/login', require('./src/routes/auth'))
app.use('/auth/reset', require('./src/routes/auth'))
app.use('/auth/register', require('./src/routes/registerUser'))
app.use('/auth/admin/login', require('./src/routes/auth'))
app.use('/auth/admin/register', require('./src/routes/registerAdmin'))
app.use('/movies', require('./src/routes/movies'))
app.use('/seat/sold', require('./src/routes/seat'))
app.use('/nowshow', require('./src/routes/moviesNowShow'))
app.use('/genre', require('./src/routes/genre'))
app.use('/cinemas', require('./src/routes/cinemas'))
app.use('/location/cinemas', require('./src/routes/locationCinema'))
app.use('/forgot', require('./src/routes/forgot'))
app.use('/transaction', require('./src/routes/transaction'))
app.use('/ticket/list', require('./src/routes/ticket'))
app.use('/profile', require('./src/routes/profile'))
app.use('/update/photo', require('./src/routes/profile'))
app.use('/schedule', require('./src/routes/schedule'))
app.use('/admin/movies', require('./src/routes/MoviesAdmin'))
app.use('/admin/cinemas/', require('./src/routes/cinemaByAdmin'))
app.use('/admin/genre', require('./src/routes/genreByAdmin'))
app.use('/admin/seat/', require('./src/routes/seatByAdmin'))
app.use('/admin/shw-time/', require('./src/routes/showTimeAdmin'))
app.use('/admin/showTimeCinema/', require('./src/routes/showTimeCinemaAdmin'))
app.use('/showtime', require('./src/routes/showTime'))

app.use('/movies/:id', require('./src/routes/movies'))
app.use('/genre/:id', require('./src/routes/genre'))
app.use('/cinemas/:id', require('./src/routes/cinemas'))
app.use('/transaction/:id', require('./src/routes/transaction'))
app.use('/admin/movies/:id', require('./src/routes/MoviesAdmin'))
app.use('/admin/cinemas/:id', require('./src/routes/cinemaByAdmin'))
app.use('/admin/genre/:id', require('./src/routes/genreByAdmin'))
app.use('/admin/seat/:id', require('./src/routes/seatByAdmin'))
app.use('/admin/shw-time/:id', require('./src/routes/showTimeAdmin'))
app.use('/admin/showtimecinema/', require('./src/routes/showTimeCinemaAdmin'))

app.listen(APP_PORT, () => {
  console.log(`Application is running opn port ${APP_PORT}`)
})
