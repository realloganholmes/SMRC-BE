const CoolerNomination = require('../models/coolerNominationSchema');
const express = require('express');
const router = express.Router();

router.delete('/deleteCooler/:id', async (req, res) => {
    try {
        const coolerId = req.params.id;

        if (!coolerId) {
            return res.status(400).json({ error: 'Cooler ID is required' });
        }

        await CoolerNomination.findByIdAndDelete(coolerId)
            .then(deletedCooler => {
                if (deletedCooler) {
                    console.log('Cooler deleted successfully:', deletedCooler);
                } else {
                    console.log('Cooler not found');
                }
            })
            .catch(error => {
                console.error('Error deleting cooler:', error);
            });

        res.status(200).json({ message: 'Deleted cooler successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete cooler' });
    }
});

module.exports = router;