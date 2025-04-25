// Update password
router.post('/resetPassword', async (req, res) => {
    const { password } = req.body;
    const user = req.user;
  
    try {
        const updatedUser = await User.findByIdAndUpdate(
            user._id,
            { password: password },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(201).json({ message: 'User password updated successfully' });
    } catch (error) {
        console.error('Password update error:', error);
        res.status(500).json({ message: 'Unable to update user password' });
    }
});