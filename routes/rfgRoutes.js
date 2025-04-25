const RFG = require('../models/rfgSchema');
const express = require('express');
const router = express.Router();

router.get('/getStandings', async (req, res) => {
    try {
        const now = new Date();
        const thisYear = now.getMonth() >= 11 && now.getDate() >= 11 ? now.getFullYear() : now.getFullYear() - 1;
        const cutoffDate = new Date(`${thisYear}-12-11T00:00:00Z`);

        const standings = await RFG.aggregate([
            { $match: { date: { $gte: cutoffDate } } },
            {
            $group: {
                _id: '$name',
                totalPoints: { $sum: '$points' },
                races: {
                $push: {
                    race: '$raceName',
                    date: '$date',
                    distance: '$distance',
                    time: '$time',
                    pr: '$isPR',
                    points: '$points',
                },
                },
            },
            },
            { $sort: { totalPoints: -1 } },
        ]);

        const withPlaces = standings.map((racer, index) => ({
            racer: racer._id,
            place: index + 1,
            points: racer.totalPoints,
            races: racer.races,
        }));

        res.status(200).json(withPlaces);
    } catch (err) {
        console.error('Error getting standings:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;