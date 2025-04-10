const express = require('express');
const router = express.Router();
const Application = require('../models/Application');

// duplicate check
router.post('/', async (req, res) => {
  try {
    const { fullName, email, phone, company, role, status, link } = req.body;

    // duplicate by email ( or phone
    const existingApplication = await Application.findOne({
      $or: [
        { email: { $regex: `^${email}$`, $options: 'i' } },
        { phone }
      ]
    });

    if (existingApplication) {
      return res.status(409).json({ 
        message: "Duplicate application detected. An application with this email or phone already exists." 
      });
    }

    // if no duplicate------create new
    const newApplication = new Application({ fullName, email, phone, company, role, status, link });
    const savedApplication = await newApplication.save();
    res.status(201).json(savedApplication);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//display job
router.get('/', async (req, res) => {
  try {
    const applications = await Application.find();
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update job 
router.put('/:id', async (req, res) => {
  try {
    const updatedApplication = await Application.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedApplication);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete job
router.delete('/:id', async (req, res) => {
  try {
    await Application.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Application deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// frequency count
router.get('/status-count', async (req, res) => {
  try {
    const counts = await Application.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    // output format:
    const result = {};
    counts.forEach(item => {
      result[item._id] = item.count;
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
