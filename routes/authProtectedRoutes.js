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

router.delete('/deleteUser', async (req, res) => {
    try {
        const user = req.user

        if (!user) {
            return res.status(400).json({ error: 'No user sent!' });
        }

        await User.findByIdAndDelete(user._id)
            .then(deletedUser => {
                if (deletedUser) {
                    console.log('User deleted successfully:', deletedUser);
                } else {
                    console.log('User not found');
                }
            })
            .catch(error => {
                console.error('Error deleting user:', error);
            });

        res.status(200).json({ message: 'Deleted user successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete user' });
    }
});

module.exports = router;