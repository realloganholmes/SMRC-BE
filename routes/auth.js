const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Register route
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const verified = false;

  const userExists = await User.findOne({ username });
  if (userExists) return res.status(400).json({ message: 'User already exists' });

  const user = new User({ username, password, verified });
  await user.save();

  res.status(201).json({ message: 'User created successfully' });
});

// Login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });

  const match = await user.matchPassword(password);
  if (!match) return res.status(400).json({ message: 'Invalid credentials' });

  if (!user.verified) return res.status(400).json({ message: 'Account not yet verified' });

  const token = jwt.sign(
    {
      userId: user._id,
      isAdmin: user.admin,
      isCoolerAdmin: user.coolerAdmin,
      isRaceAdmin: user.raceAdmin,
      isRFGAdmin: user.RFGAdmin,
      isRecapAdmin: user.recapAdmin,
      isDashboardAdmin: user.dashboardAdmin
    },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.json({ token });
});

module.exports = router;
