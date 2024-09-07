const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const { getCityLoc, getCityPic, weatherTemp } = require('./handleAPIS');

// Initialize environment variables
dotenv.config();

const app = express();

// Middleware to parse incoming requests
app.use(express.json());
app.use(express.static('dist'));


const port = 8080;

const geonamesUsername  = process.env.GEONAMES_USERNAME  || 'beesan';  // Fall back to 'beesan' if not in .env;
const weatherbitApiKey = process.env.WEATHERBIT_API_KEY;
const pixabayApiKey = process.env.PIXABAY_API_KEY;

// Log the API keys to verify
console.log(`Geonames Username: ${geonamesUsername}`);
console.log(`Weatherbit API Key: ${weatherbitApiKey}`);
console.log(`Pixabay API Key: ${pixabayApiKey}`);
app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

app.post("/getCity", async (req, res) => {
    const city = req.body.city;
    const Location = await getCityLoc(city, geonamesUsername);
    return res.send(Location);
});

app.post("/getWeather", async (req, res) => {
    const { lng, lat, remainingDays } = req.body;
    const getWeather = await weatherTemp(lng, lat, remainingDays, weatherbitApiKey);
    return res.send(getWeather);
});

app.post("/getCityPic", async (req, res) => {
    const { city_name } = req.body;
    const getPic = await getCityPic(city_name, pixabayApiKey);
    return res.send(getPic);
});

app.listen(8080, () => console.log(`Server is listening on port ${port}`));
