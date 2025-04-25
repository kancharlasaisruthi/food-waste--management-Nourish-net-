// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone:{
    type:Number,
    required:true
  },
  role: {
    type: String,
    enum: ['Donor', 'Receiver', 'Volunteer'],
    default: 'donor'
  },
  
});

module.exports = mongoose.model('User', userSchema);