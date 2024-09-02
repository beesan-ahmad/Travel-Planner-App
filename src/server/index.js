const path = require('path');
const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Serve static files from the 'dist' directory
app.use(express.static('dist'));

// API route for Geonames, Weatherbit, and Pixabay
app.post('/api/travel', async (req, res) => {
    const { location, date } = req.body;


    res.send({ success: true, message: 'Request received' });
});

// Fallback route for the root
app.get('/', (req, res) => {
    res.sendFile(path.resolve('dist/index.html'));
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
