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
    ["MarathonPR", 12],
    ["Marathon", 10],
    ["10kPR", 8],
    ["10k", 6],
    ["5kPR", 4],
    ["5k", 2],
]);

router.post('/addRFG', async (req, res) => {
  const { racer, race, date, distance, time, pr } = req.body;

  try {
    const rfg = new RFG({
      name: racer,
      raceName: race,
      date,
      time,
      distance,
      isPR: pr,
      points: pointsMap.get(distance + (pr ? 'PR' : '')),
    });

    await rfg.save();

    res.status(201).json({ message: 'RFG entry saved successfully!' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Failed to save RFG entry.' });
  }
});

module.exports = router;