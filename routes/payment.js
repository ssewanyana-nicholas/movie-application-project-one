const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

const { MTN_API_KEY, MTN_API_SECRET, MTN_API_BASE_URL } = process.env;

// Payment initiation route
router.post('/initiate', async (req, res) => {
    const { amount, phoneNumber } = req.body;  // Take amount and phone number from the request body

    try {
        const response = await axios.post(`${MTN_API_BASE_URL}/v1_0/merchant/collection/fee`, {
            amount,
            phoneNumber
        }, {
            headers: {
                'Authorization': `Bearer ${MTN_API_KEY}`,
                'Content-Type': 'application/json',
            }
        });

        res.json({ success: true, message: 'Payment initiated', data: response.data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to initiate payment' });
    }
});

module.exports = router;
