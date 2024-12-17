const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();

const { API_KEY } = process.env; // Get API Key from .env for TMDB

// Route to get top-rated movies
router.get('/top-rated', async (req, res) => {
    const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`;

    try {
        const response = await axios.get(url);
        const movies = response.data.results;
        res.json({ success: true, data: movies });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to fetch movies' });
    }
});

// Route to search movies
router.get('/search', async (req, res) => {
    const query = req.query.query;
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&language=en-US&page=1`;

    try {
        const response = await axios.get(url);
        const movies = response.data.results;
        res.json({ success: true, data: movies });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to search movies' });
    }
});

module.exports = router;
