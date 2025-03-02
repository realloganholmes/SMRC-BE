const CoolerNomination = require('../models/coolerNominationSchema');
const express = require('express');
const router = express.Router();

router.post('/coolerNominate', async (req, res) => {
  const { nominee, date, comment } = req.body;

  try {
    const username = req.user.username;
    const coolerNomination = new CoolerNomination({
      nominee,
      date,
      comment,
      nominator: username,
    });

    await coolerNomination.save();

    res.status(201).json({ message: 'Cooler nomination saved successfully!' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Failed to save cooler nomination.' });
  }
});
  
router.get('/coolerNominations', async (req, res) => {
  try {
    const coolerNominations = await CoolerNomination.find();
    
    res.status(200).json(coolerNominations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve cooler nominations.' });
  }
});

module.exports = router;