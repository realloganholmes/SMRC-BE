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

module.exports = router;