// Function to handle form submission
export const processSubmission = async (event) => {
    event.preventDefault();

    const city = document.getElementById('city').value;
    const date = document.getElementById('date').value;
    
    // Calculate remaining days to the travel date
    const today = new Date();
    const travelDate = new Date(date);
    const remainingDays = Math.ceil((travelDate - today) / (1000 * 60 * 60 * 24));

    try {
        // Get city location from server
        const locationResponse = await fetch('/getCity', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ city })
        });
        const locationData = await locationResponse.json();

        // Handle no city found
        if (locationData.error) {
            document.getElementById('results').innerHTML = `<p>${locationData.message}</p>`;
            return;
        }

        const { lng, lat } = locationData;

        // Get weather data from server
        const weatherResponse = await fetch('/getWeather', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ lng, lat, remainingDays })
        });
        const weatherData = await weatherResponse.json();

        // Get city image from server
        const picResponse = await fetch('/getCityPic', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ city_name: city })
        });
        const picData = await picResponse.json();

        // Update the UI with results
        document.getElementById('results').innerHTML = `
            <h2>Weather in ${city}</h2>
            <p>${weatherData.description}</p>
            <p>Temperature: ${weatherData.temp}°C</p>
            <p>Max Temperature: ${weatherData.app_max_temp}°C</p>
            <p>Min Temperature: ${weatherData.app_min_temp}°C</p>
            <img src="${picData.image}" alt="${city}">
        `;
    } catch (error) {
        console.error("Error occurred:", error);
        document.getElementById('results').innerHTML = `<p>Something went wrong. Please try again later.</p>`;
    }
};
