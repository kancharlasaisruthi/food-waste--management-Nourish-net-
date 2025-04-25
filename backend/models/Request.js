// models/Request.js
const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  donation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Donation',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  requestorName: {
    type: String,
    required: true
  },
  requestorEmail: {
    type: String,
    required: true
  },
  requestorPhone: {
    type: String,
    required: true
  },
  requestorAddress: {
    type: String,
    required: true
  },
  numberOfPeople: {
    type: Number,
    required: true
  },
  message: {
    type: String
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'completed'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Request', requestSchema);