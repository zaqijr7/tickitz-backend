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

app.use('/movies', require('./src/routes/movies'))
app.use('/movies/:id', require('./src/routes/movies'))
app.use('/genre', require('./src/routes/genre'))
app.use('/cinemas', require('./src/routes/cinemas'))
app.use('/cinemas/:id', require('./src/routes/cinemas'))
app.use('/admin/movies', require('./src/routes/admin'))
app.use('/admin/movies/:id', require('./src/routes/admin'))
app.use('/admin/cinemas/', require('./src/routes/cinemaByAdmin'))
app.use('/admin/cinemas/:id', require('./src/routes/cinemaByAdmin'))
app.use('/admin/genre', require('./src/routes/genreByAdmin'))
app.use('/admin/genre/:id', require('./src/routes/genreByAdmin'))

app.listen(APP_PORT, () => {
  console.log(`Application is running opn port ${APP_PORT}`)
})
