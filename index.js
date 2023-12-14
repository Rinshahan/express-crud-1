const express = require('express')
const fs = require('fs')
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

app.use(morgan('dev'))
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))


const users = JSON.parse(fs.readFileSync('./data/users.json'))
// get users
app.get('/users', (req, res) => {
  res.status(200).json({
    status: "success",
    count: users.length,
    data: {
      users: users
    }
  })
})
// get users by id

app.get('/users/:id', (req, res) => {
  const id = +req.params.id
  const userById = users.find(user => user.id === id)
  if (!userById) {
    throw new Error("User not Found")
  } else {
    res.status(200).json({
      status: "success",
      data: {
        user: userById
      }
    })
  }
})

// create users

app.post('/users', (req, res) => {
  console.log(req.body);
  const newId = users[users.length - 1].id + 1
  const newUser = Object.assign({ id: newId }, req.body)
  users.push(newUser)
  fs.writeFile('./data/users.json', JSON.stringify(users), (err) => {
    if (err) {
      console.log(err.message);
    } else {
      res.status(200).json({
        status: "success",
        data: {
          users: users
        }
      })
    }
  })

})


app.patch('/users/:id', (req, res) => {
  const id = +req.params.id
  const user = users.find(user => user.id === id)
  const index = users.findIndex(user => user.id === id)
  Object.assign(user, req.body)
  users[index] = user
  fs.writeFile('./data/users.json', JSON.stringify(users), (err) => {
    if (err) {
      console.log(err.message);
    } else {
      res.status(200).json({
        status: 'ok',
        data: {
          user: user
        }
      })
    }
  })
})


app.delete('/users/:id', (req, res) => {
  const id = +req.params.id
  const userById = users.find(user => user.id === id)
  const index = users.indexOf(userById)
  users.splice(index, 1)
  res.status(200).json({
    status: "ok",
    data: {
      users: users
    }
  })
})

app.use(errorHandler)

app.listen(4000, () => {
  console.log(`Listening to port 4000`);
})