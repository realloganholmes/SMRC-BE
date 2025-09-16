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

router.post('/recapConverted', async (req, res) => {
    const { recapId } = req.body;

    if (!recapId) {
        return res.status(400).json({ error: 'recapId is required' });
    }

    try {
        const updatedRecap = await Recap.findByIdAndUpdate(
            recapId,
            { convertedToRFG: true },
            { new: true }
        );

        if (!updatedRecap) {
            return res.status(404).json({ error: 'Recap not found' });
        }

        res.status(200).json({ message: 'Recap converted to RFG', recap: updatedRecap });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Failed to update recap' });
    }
});

router.get('/getUnconvertedRecaps', async (req, res) => {
    try {
        const recaps = await Recap.find({ convertedToRFG: false }).sort({ date: -1 });

        res.status(200).json(recaps);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve recaps.' });
    }
});

module.exports = router;