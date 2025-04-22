const Recap = require('../models/recapSchema');
const express = require('express');
const router = express.Router();

router.delete('/deleteRecap/:id', async (req, res) => {
    try {
        const recapId = req.params.id;

        if (!recapId) {
            return res.status(400).json({ error: 'Recap ID is required' });
        }

        await Recap.findByIdAndDelete(recapId)
            .then(deletedRecap => {
                if (deletedRecap) {
                    console.log('Recap deleted successfully:', deletedRecap);
                } else {
                    console.log('Recap not found');
                }
            })
            .catch(error => {
                console.error('Error deleting recap:', error);
            });

        res.status(200).json({ message: 'Deleted recap successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete recap' });
    }
});

module.exports = router;