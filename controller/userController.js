const fs = require('fs')
const users = JSON.parse(fs.readFileSync('./data/users.json'))
const getAllUsers = (req, res) => {
  res.status(200).json({
    status: "success",
    count: users.length,
    data: {
      users: users
    }
  })
}
// get users by id

const getUserId = (req, res) => {
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
}


// create users
const createUser = (req, res) => {
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
}

const updateUser = (req, res) => {
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
}


const deleteUser = (req, res) => {
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
}

module.exports = {
  getAllUsers,
  getUserId,
  deleteUser,
  updateUser,
  createUser
}