const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is Required']
  },
  age: Number,
  gender: {
    type: String,
    required: [true, 'Gender is required']
  },
  email: {
    type: String,
    required: [true, 'Email is Required'],
    unique: true
  }
})
const User = mongoose.model('user', userSchema)

module.exports = User