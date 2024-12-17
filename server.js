require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path'); // Import the path module
const authRoutes = require('./routes/auth');
const paymentRoutes = require('./routes/payment');
const movieRoutes = require('./routes/movies');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set EJS as the template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/auth', authRoutes);      // For MTN Mobile Money API authentication
app.use('/payment', paymentRoutes); // For payment integration
app.use('/movies', movieRoutes);   // For movie data and booking

// Homepage route
app.get('/', (req, res) => {
    res.render('index'); // Render the index.ejs file
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
