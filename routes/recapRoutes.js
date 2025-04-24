const Recap = require('../models/recapSchema');
const express = require('express');
const router = express.Router();

router.post('/addRecap', async (req, res) => {
  const { date, raceName, time, distance, hostUrl } = req.body;

  try {
    const username = req.user.username;
    const recap = new Recap({
      date,
      raceName,
      time,
      distance,
      hostUrl,
      author: username,
    });

    await recap.save();

    res.status(201).json({ message: 'Recap saved successfully!' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Failed to save recap.' });
  }
});
  
router.get('/getRecaps', async (req, res) => {
  try {
    const { startDate, endDate, date, distance, raceName, author } = req.query;

    const query = {};

    if (date) {
      const dayStart = new Date(date);
      const dayEnd = new Date(date);
      dayEnd.setDate(dayEnd.getDate() + 1);

      query.date = { $gte: dayStart, $lt: dayEnd };
    } else if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    if (distance) query.distance = distance;
    if (raceName) query.raceName = raceName;
    if (author) query.author = author;

    const recaps = await Recap.find(query).sort({ date: -1 });
    
    res.status(200).json(recaps);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve recaps.' });
  }
});

module.exports = router;