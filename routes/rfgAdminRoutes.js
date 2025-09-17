const RFG = require('../models/rfgSchema');
const express = require('express');
const router = express.Router();

router.delete('/deleteRFG/:id', async (req, res) => {
    try {
        const rfgId = req.params.id;

        if (!rfgId) {
            return res.status(400).json({ error: 'RFG ID is required' });
        }

        await RFG.findByIdAndDelete(rfgId)
            .then(deletedRFG => {
                if (deletedRFG) {
                    console.log('RFG entry deleted successfully:', deletedRFG);
                } else {
                    console.log('RFG entry not found');
                }
            })
            .catch(error => {
                console.error('Error deleting RFG entry:', error);
            });

        res.status(200).json({ message: 'Deleted RFG entry successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete RFG entry' });
    }
});

const pointsMap = new Map([
    ["MarathonPR", 16],
    ["MarathonAPR", 12],
    ["Marathon", 4],
    ["Half MarathonPR", 13],
    ["Half MarathonAPR", 10],
    ["Half Marathon", 3],
    ["15kPR", 11],
    ["15kAPR", 10],
    ["15k", 3],
    ["10kPR", 9],
    ["10kAPR", 8],
    ["10k", 2],
    ["5kPR", 8],
    ["5kAPR", 6],
    ["5k", 1],
]);

router.post('/addRFG', async (req, res) => {
    const { racer, race, date, distance, time, pr, apr } = req.body;

    try {
        const rfg = new RFG({
            name: racer,
            raceName: race,
            date,
            time,
            distance,
            isPR: pr,
            isAPR: apr,
            points: pointsMap.get(distance + (pr ? 'PR' : (apr ? 'APR' : ''))),
        });

        await rfg.save();

        res.status(201).json({ message: 'RFG entry saved successfully!' });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Failed to save RFG entry.' });
    }
});

module.exports = router;