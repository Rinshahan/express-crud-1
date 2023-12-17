
const User = require('../models/userModel')

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
    res.status(200).json({
      status: 'Success',
      user: users.length,
      data: {
        user: users
      }
    })
  } catch (err) {
    res.status(404).json({
      status: "not found",
      message: err.message
    })
  }
}
// get users by id

const getUserId = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    res.status(200).json({
      status: "successfull",
      data: {
        user
      }
    })
  } catch (err) {
    res.status(404).json({
      status: 'not found',
      message: err.message
    })
  }

}


// create users
const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body)
    res.status(201).json({
      status: 'success',
      user
    })
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message
    })
  }
}

const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json({
      status: "updated",
      data: {
        updatedData: user
      }
    })
  } catch (err) {
    res.status(404).json({
      status: "not found",
      message: err.message
    })
  }
}


const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id)
    res.status(204).json({
      status: "Deleted",
      data: null
    })
  } catch (err) {
    res.status(404).json({
      status: "not found",
      message: err.message
    })
  }
}

module.exports = {
  getAllUsers,
  getUserId,
  deleteUser,
  updateUser,
  createUser
}