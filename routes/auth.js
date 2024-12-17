const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

const { MTN_API_KEY, MTN_API_SECRET, MTN_API_BASE_URL } = process.env;

// MTN Authentication Route
router.post('/auth', async (req, res) => {
    try {
        const response = await axios.post(`${MTN_API_BASE_URL}/v1_0/apiuser`, {}, {
            headers: {
                'Authorization': `Basic ${Buffer.from(`${MTN_API_KEY}:${MTN_API_SECRET}`).toString('base64')}`,
                'Content-Type': 'application/json',
            }
        });

        // Handle success
        res.json({ success: true, message: 'Authenticated successfully', data: response.data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to authenticate with MTN Mobile Money' });
    }
});

module.exports = router;
