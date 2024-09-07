const axios = require("axios");

// Geonames API: Get city location (latitude, longitude)
const getCityLoc = async(city, geonamesUsername) => {
    const {data} = await axios.get(`https://secure.geonames.org/searchJSON?q=${city}&maxRows=1&username=${geonamesUsername}`);
    
    if (!data.geonames.length) {
        return {
            message: "No city with that name. Please make sure of your spelling",
            error: true
        };
    }
    return data.geonames[0];
};

// console.log("user name", username)

// Pixabay API: Get city image
const getCityPic = async(city, key) => {
    const {data} = await axios.get(`https://pixabay.com/api/?key=${key}&q=${city}&image_type=photo`);
    const image = data.hits[0] ? data.hits[0].webformatURL : "https://source.unsplash.com/random/640x480?city,morning,night?sig=1";
    
    return { image };
};

// Weatherbit API: Get weather data based on location and remaining days
const weatherTemp = async(lo, la, Rdays, key) => {
    if (Rdays < 0) {
        return {
            message: "Date cannot be in the past",
            error: true
        };
    }

    if (Rdays > 0 && Rdays <= 7) {
        const {data} = await axios.get(`https://api.weatherbit.io/v2.0/current?lat=${la}&lon=${lo}&units=M&key=${key}`);
        const {weather, temp} = data.data[data.data.length - 1];
        const {description} = weather;
        return { description, temp };
    } else if (Rdays > 7) {
        const {data} = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${la}&lon=${lo}&units=M&days=${Rdays}&key=${key}`);
        const {weather, temp, app_max_temp, app_min_temp} = data.data[data.data.length - 1];
        const {description} = weather;
        return { description, temp, app_max_temp, app_min_temp };
    }
};

module.exports = {
    getCityLoc,
    getCityPic,
    weatherTemp
};
