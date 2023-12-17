const express = require('express')
const UserRoutes = require('./routes/userRoutes')
const morgan = require('morgan')
const app = express()
const bodyparser = require('body-parser')

app.use(morgan('dev'))
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))

app.use('/users', UserRoutes)

// get users
module.exports = app






