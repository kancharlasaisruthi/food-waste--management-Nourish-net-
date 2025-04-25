const express = require('express');
const router = express.Router();
const Request = require('../models/Request');

const { isAuthenticated } = require('../middleware/auth');

// Create a new request (receiver only)
router.post('/', isAuthenticated, async (req, res) => {
  try {
    if (req.user.role !== 'receiver' && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to create requests' });
    }

    const { foodItemId, message } = req.body;

    // Check if food item exists
    const foodItem = await FoodItem.findById(foodItemId);
    if (!foodItem) {
      return res.status(404).json({ message: 'Food item not found' });
    }

    // Check if food item is available
    if (foodItem.status !== 'available') {
      return res.status(400).json({ message: 'Food item is not available' });
    }

    // Check if user already requested this food item
    const existingRequest = await Request.findOne({
      requester: req.user.id,
      foodItem: foodItemId
    });

    if (existingRequest) {
      return res.status(400).json({ message: 'You have already requested this food item' });
    }

    // Create request
    const request = new Request({
      requester: req.user.id,
      foodItem: foodItemId,
      message
    });

    await request.save();

    res.status(201).json(request);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all requests for a food item (donor only)
router.get('/food-item/:foodItemId', isAuthenticated, async (req, res) => {
  try {
    const foodItem = await FoodItem.findById(req.params.foodItemId);

    if (!foodItem) {
      return res.status(404).json({ message: 'Food item not found' });
    }

    // Check if user is the donor
    if (foodItem.donor.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to view requests for this food item' });
    }

    const requests = await Request.find({ foodItem: req.params.foodItemId })
      .populate('requester', 'username email phoneNumber')
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update request status (donor only)
router.put('/:id', isAuthenticated, async (req, res) => {
  try {
    const request = await Request.findById(req.params.id)
      .populate('foodItem');

    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    // Check if user is the donor of the food item
    const foodItem = await FoodItem.findById(request.foodItem._id);

    if (foodItem.donor.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this request' });
    }

    const { status } = req.body;

    request.status = status;
    await request.save();

    // If request is accepted, update food item status
    if (status === 'accepted') {
      // Update food item status
      foodItem.status = 'reserved';
      await foodItem.save();

      // Reject all other requests for this food item
      await Request.updateMany(
        {
          foodItem: foodItem._id,
          _id: { $ne: request._id },
          status: 'pending'
        },
        { $set: { status: 'rejected' } }
      );
    }

    res.json(request);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get requests by requester
router.get('/requester/me', isAuthenticated, async (req, res) => {
  try {
    if (req.user.role !== 'receiver' && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const requests = await Request.find({ requester: req.user.id })
      .populate('foodItem')
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
