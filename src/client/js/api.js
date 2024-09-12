import axios from 'axios';

// Fetch location data from Geonames API
export async function fetchLocationData(destination) {
    try {
        const response = await axios.get('http://api.geonames.org/searchJSON', {
            params: {
                q: destination,
                maxRows: 1,
                username: process.env.GEONAMES_USERNAME // Your Geonames username stored in the environment
            }
        });

        if (response.data.geonames.length > 0) {
            const location = response.data.geonames[0];
            return {
                lat: location.lat,
                lng: location.lng,
                country: location.countryName
            };
        } else {
            throw new Error('Location data not found.');
        }
    } catch (error) {
        console.error('Error fetching location data:', error);
        throw new Error('Unable to fetch location data.');
    }
}

// Fetch weather data from Weatherbit API
export async function fetchWeatherData(lat, lng) {
    try {
        const response = await axios.get('https://api.weatherbit.io/v2.0/current', {
            params: {
                lat: lat,
                lon: lng,
                key: process.env.WEATHERBIT_KEY // Your Weatherbit API key stored in the environment
            }
        });

        if (response.data && response.data.data && response.data.data.length > 0) {
            return response.data;
        } else {
            throw new Error('Weather data not found.');
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw new Error('Unable to fetch weather data.');
    }
}

// Fetch image data from Pixabay API
export async function fetchImageData(destination) {
    try {
        const response = await axios.get('https://pixabay.com/api/', {
            params: {
                q: destination,
                key: process.env.PIXABAY_KEY, // Your Pixabay API key stored in the environment
                image_type: 'photo',
                orientation: 'horizontal',
                per_page: 3
            }
        });

        if (response.data && response.data.hits && response.data.hits.length > 0) {
            return response.data.hits[0]; // Returning the first image result
        } else {
            throw new Error('Image data not found.');
        }
    } catch (error) {
        console.error('Error fetching image data:', error);
        throw new Error('Unable to fetch image data.');
    }
}
