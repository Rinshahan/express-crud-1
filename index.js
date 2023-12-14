const express = require('express')
const UserRoutes = require('./routes/userRoutes')
const morgan = require('morgan')
const app = express()

const bodyparser = require('body-parser')
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500
  res.status(statusCode)
  switch (statusCode) {
    case 401:
      res.json({
        title: "Unauthorized",
        message: err.message
      })
      break;
    case 404:
      res.json({
        title: "not found",
        message: err.message
      })
      break;
    case 500:
      res.json({
        title: "Server Error",
        message: err.message
      })
      break;
    default:
      break;
  }
}
app.use(errorHandler)
app.use(morgan('dev'))
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))

app.use('/users', UserRoutes)

// get users
module.exports = app






