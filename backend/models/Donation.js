const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  foodType: String,
  foodItem: String,
  foodQuantity: Number,
  address: String,
  city: String,
  expirationdate: String,
  storagemethod: String,
  condition: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Donation', donationSchema);
