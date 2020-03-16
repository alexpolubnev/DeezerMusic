const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
  login: String,
  password: String,
  tracks: [{
    type: Number,
    default: []
  }]
})

module.exports = mongoose.model('Users', usersSchema);
