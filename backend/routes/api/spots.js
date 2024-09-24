const express = require('express');
const router = express.Router();
const { Spot, Review, SpotImage } = require('../../db/models');

// Get all Spots
router.get('/spots', async (req, res) => {
    try {
        const spots = Spot.findAll({

        });
    } catch (err) {
        return res.status(500).json({ "message": "Unable to return all Spots" });
    }
});

module.exports = router;