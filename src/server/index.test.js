const request = require('supertest');
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(express.json());

const geonamesUsername = process.env.GEONAMES_USERNAME || 'beesan';
const weatherbitApiKey = process.env.WEATHERBIT_KEY;
const pixabayApiKey = process.env.PIXABAY_KEY;

app.get('/apiKeys', (req, res) => {
    res.json({
        geonamesUsername,
        weatherbitApiKey,
        pixabayApiKey
    });
});

describe('GET /apiKeys', () => {
    it('should return the API keys', async () => {
        const response = await request(app).get('/apiKeys');
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('geonamesUsername');
        expect(response.body).toHaveProperty('weatherbitApiKey');
        expect(response.body).toHaveProperty('pixabayApiKey');
    });
});
