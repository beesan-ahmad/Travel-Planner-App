const pixabayApiKey = process.env.PIXABAY_KEY || '45771225-18d216db83f778795e65302de';

// Function to fetch location data from Geonames API
async function fetchLocationData(destination) {
    const geonamesUsername = 'beesan';
  
    if (!geonamesUsername) {
        throw new Error("Geonames username is not defined in the environment variables.");
    }
  
    const url = `http://api.geonames.org/searchJSON?q=${destination}&maxRows=1&username=${geonamesUsername}`;
  
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Geonames API request failed with status ${response.status}`);
        }
  
        const data = await response.json();
        if (!data || !data.geonames || data.geonames.length === 0) {
            throw new Error("No location data found for the given destination.");
        }
  
        return data.geonames[0];
    } catch (error) {
        console.error("Error fetching location data:", error);
        return null;
    }
}

// Function to fetch weather data from Weatherbit API
const weatherbitApiKey = process.env.WEATHERBIT_API_KEY || '0ad7a46e1239486cb42590ed71dd7430';

async function fetchWeatherData(lat, lon) {
    const url = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${weatherbitApiKey}`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Weatherbit API request failed with status ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        return null;
    }
}

// Function to fetch image data from Pixabay API
async function fetchImageData(destination) {
    const url = `https://pixabay.com/api/?key=${pixabayApiKey}&q=${encodeURIComponent(destination)}&image_type=photo`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Pixabay API request failed with status ${response.status}`);
        }
        const data = await response.json();
        return data.hits[0]; // or handle cases when there are no hits
    } catch (error) {
        console.error("Error fetching image data:", error);
        return null;
    }
}


// Function to handle form submission
async function handleTravelForm(event) {
    event.preventDefault();
  
    const destination = document.getElementById('destination').value;
    const date = document.getElementById('date').value;
  
    try {
        const locationData = await fetchLocationData(destination);
  
        if (!locationData) {
            alert("Unable to retrieve location data. Please try again.");
            return;
        }
  
        const weatherData = await fetchWeatherData(locationData.lat, locationData.lng);
        const imageData = await fetchImageData(destination);
  
        if (weatherData && imageData) {
            console.log("Weather Data:", weatherData);
            console.log("Image Data:", imageData);

            // Update the DOM with weather data (temperature)
            const temperatureElement = document.getElementById('temperature');
            const temperature = weatherData.data[0].temp; // Get temperature from the API response
            temperatureElement.textContent = `Temperature: ${temperature} °C`; // Set text content to display the temperature

            // Update the DOM with image data
            const imageElement = document.getElementById('destination-image');
            imageElement.src = imageData.previewURL; // Set image source to the image from Pixabay
            imageElement.alt = `Image of ${destination}`; // Set an appropriate alt text for accessibility
        } else {
            alert("Failed to retrieve data from APIs.");
        }
  
    } catch (error) {
        console.error("Error handling travel form submission:", error);
    }
}


document.getElementById('travel-form').addEventListener('submit', handleTravelForm);
