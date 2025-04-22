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
    const recaps = await Recap.find();
    
    res.status(200).json(recaps);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve recaps.' });
  }
});

module.exports = router;