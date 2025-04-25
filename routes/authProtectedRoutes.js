const User = require('../models/User');
const express = require('express');
const router = express.Router();

// Update password
router.post('/resetPassword', async (req, res) => {
    const { password } = req.body;
    const user = req.user;
  
    try {
        user.password = password;
        await user.save();

        res.status(201).json({ message: 'User password updated successfully' });
    } catch (error) {
        console.error('Password update error:', error);
        res.status(500).json({ message: 'Unable to update user password' });
    }
});

// Get all users
router.get('/allUsers', async (req, res) => {
    try {
        const users = await User.find({}, 'username');
        const usernames = users.map(user => user.username);
        res.status(200).json(usernames);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve all users.' });
      }
});


module.exports = router;