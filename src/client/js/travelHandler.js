import { fetchLocationData, fetchWeatherData, fetchImageData } from './api';
import { getDaysUntilDeparture, getTripDuration } from './utils';

export async function handleTravelForm(event) {
    event.preventDefault();

    // Get form values
    const destination = document.getElementById('destination').value.trim();
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;

    // Validate the form inputs
    if (!destination || !startDate || !endDate) {
        alert("Please provide all required fields: destination, start date, and end date.");
        return;
    }

    try {
        // Fetch location data
        const locationData = await fetchLocationData(destination);
        if (!locationData) {
            alert("Unable to retrieve location data. Please try again.");
            return;
        }

        const { lat, lng } = locationData;

        // Fetch weather data
        const weatherData = await fetchWeatherData(lat, lng);
        if (!weatherData) {
            alert("Unable to retrieve weather data.");
            return;
        }

        // Fetch image data
        const imageData = await fetchImageData(destination);
        if (!imageData) {
            alert("Unable to retrieve image data.");
            return;
        }

        // Calculate and display trip details
        const daysUntilTrip = getDaysUntilDeparture(startDate);
        const tripDuration = getTripDuration(startDate, endDate);

        // Update the DOM with weather data
        const temperatureElement = document.getElementById('temperature');
        const temperature = weatherData.data[0]?.temp;
        if (temperature) {
            temperatureElement.textContent = `Temperature: ${temperature} °C`;
        } else {
            temperatureElement.textContent = "Temperature data unavailable";
        }

        // Update the DOM with image data
        const imageElement = document.getElementById('destination-image');
        if (imageData.previewURL) {
            imageElement.src = imageData.previewURL;
            imageElement.alt = `Image of ${destination}`;
        } else {
            imageElement.alt = "Image not available";
        }

        // Display trip details
        document.getElementById('days-until-trip').textContent = `Days until trip: ${daysUntilTrip}`;
        document.getElementById('trip-duration').textContent = `Trip duration: ${tripDuration} days`;
        document.getElementById('start-date-display').textContent = `Start date: ${startDate}`;
        document.getElementById('end-date-display').textContent = `End date: ${endDate}`;

    } catch (error) {
        console.error("Error handling travel form submission:", error);
        alert("An error occurred while processing your request. Please try again.");
    }
}
