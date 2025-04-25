const express = require('express');
const router = express.Router();
const Donation = require('../models/Donation');


// GET: Fetch available donations (deleting 0 quantity before sending)
router.get('/available', async (req, res) => {
  try {
    // First delete donations with 0 quantity
    await Donation.deleteMany({ foodQuantity: { $in: ['0', 0] } });

    // Now fetch donations with valid quantity
    const availableDonations = await Donation.find({ foodQuantity: { $ne: 0 } });

    res.json(availableDonations);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch donations', error: err.message });
  }
});




// PATCH: Update quantity after order
router.patch('/order/:id', async (req, res) => {
  const { id } = req.params;
  const { orderedQuantity } = req.body;

  try {
    const donation = await Donation.findById(id);
    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    const currentQuantity = parseInt(donation.foodQuantity);
    const orderQty = parseInt(orderedQuantity);

    if (orderQty > currentQuantity) {
      return res.status(400).json({ message: 'Not enough quantity available' });
    }

    donation.foodQuantity = currentQuantity - orderQty;
    await donation.save();

    res.json({ message: 'Order placed successfully', updatedDonation: donation });
  } catch (err) {
    res.status(500).json({ message: 'Error updating donation quantity', error: err.message });
  }
});


router.post('/', async (req, res) => {
  console.log('Received donation POST request');

  try {
    const newDonation = new Donation(req.body);
    await newDonation.save();
    res.status(201).json({ message: 'Donation submitted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to submit donation', error: err.message });
  }
});

router.post('/order/:id', async (req, res) => {
  const { id } = req.params;
  const { requestedQuantity } = req.body;

  try {
    const donation = await Donation.findById(id);

    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    const currentQuantity = parseInt(donation.foodQuantity);
    const newQuantity = currentQuantity - parseInt(requestedQuantity);

    if (newQuantity < 0) {
      return res.status(400).json({ message: 'Requested quantity exceeds available stock' });
    }

    if (newQuantity === 0) {
      await Donation.findByIdAndDelete(id);
      return res.status(200).json({ message: 'Donation fully claimed and removed' });
    } else {
      donation.foodQuantity = newQuantity;
      await donation.save();
      return res.status(200).json({ message: 'Donation quantity updated', updatedDonation: donation });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to update donation', error: error.message });
  }
});

module.exports = router;
