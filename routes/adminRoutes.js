const User = require('../models/User');
const Users = require('../models/User');
const express = require('express');
const router = express.Router();

router.get('/users', async (req, res) => {
    try {
        const users = await Users.find(
            { verified: true },
            { password: 0 }
        );
      
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to retrieve users.' });
    }
});

router.get('/unverified-users', async (req, res) => {
    try {
        const unverifiedUsers = await Users.find(
            { verified: false },
            { password: 0 }
        );
        
        res.status(200).json(unverifiedUsers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve unverified users.' });
    }
});

router.put('/permissions', async (req, res) => {
    try {
        const currentUser = req.body.currentUser;
        const userId = currentUser._id;

        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId, 
            {
                admin: currentUser.admin, 
                coolerAdmin: currentUser.coolerAdmin, 
                raceAdmin: currentUser.raceAdmin, 
                RFGAdmin: currentUser.RFGAdmin, 
                recapAdmin: currentUser.recapAdmin, 
                dashboardAdmin: currentUser.dashboardAdmin, 
            },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ message: 'Updated permissions successfully', updatedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update permissions' });
    }
});

router.put('/verifyUser', async (req, res) => {
    try {
        const user = req.body.user;
        const userId = user._id;

        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId, 
            {
                verified: true
            },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ message: 'Verified user successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to verify user' });
    }
});

router.delete('/denyUser/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        await User.findByIdAndDelete(userId)
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