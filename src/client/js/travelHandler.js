import { fetchLocationData, fetchWeatherData, fetchImageData } from './api';
import { getDaysUntilDeparture, getTripDuration } from './utils';

// Function to validate destination input
function validateDestinationInput(destination) {
    // Allow only alphabetical letters and spaces; reject numbers or special characters
    const destinationPattern = /^[a-zA-Z\s]+$/;

    if (destination.length < 3) {
        return "Destination name must be at least 3 characters long.";
    } else if (!destinationPattern.test(destination)) {
        return "Invalid destination name. Please enter letters only, no numbers or special characters.";
    }
    return null; // Valid input
}

export async function handleTravelForm(event) {
    event.preventDefault();

    // Get form values
    const destination = document.getElementById('destination').value.trim();
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;

    // Validate the form inputs
    const validationError = validateDestinationInput(destination);
    if (validationError) {
        alert(validationError);  // Show error message
        return;
    }

    if (!destination || !startDate || !endDate) {
        alert("Please fill in all fields.");
        return;
    }

    // Convert input dates to Date objects
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);

    // Get today's date, but reset time to midnight for accurate comparison
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to 00:00:00 for accurate date comparison

    // Check if start date is in the past
    if (startDateObj < today) {
        alert("The start date can't be in the past. Please choose a future date.");
        return;
    }

    // Check if the end date is after the start date
    if (endDateObj <= startDateObj) {
        alert("The return date must be after the start date. Please adjust your dates.");
        return;
    }

    try {
        // Fetch location data
        const locationData = await fetchLocationData(destination);
        if (!locationData || !locationData.lat || !locationData.lng) {
            throw new Error("Location data not found.");
        }

        const { lat, lng } = locationData;

        // Fetch weather data
        const weatherData = await fetchWeatherData(lat, lng);
        if (!weatherData) {
            throw new Error("Weather data not found.");
        }

        // Fetch image data
        const imageData = await fetchImageData(destination);
        if (!imageData) {
            throw new Error("Image data not found.");
        }

        // Calculate and display trip details
        const daysUntilTrip = getDaysUntilDeparture(startDate);
        const tripDuration = getTripDuration(startDate, endDate);

        document.getElementById('days-until-trip').textContent = `Days until trip: ${daysUntilTrip}`;
        document.getElementById('trip-duration').textContent = `Trip duration: ${tripDuration} days`;

        document.getElementById('start-date-display').textContent = `Start date: ${startDate}`;
        document.getElementById('end-date-display').textContent = `End date: ${endDate}`;

        // Display image if available
        const imageElement = document.getElementById('destination-image');
        if (imageData && imageData.webformatURL) {
            imageElement.src = imageData.webformatURL;
            imageElement.alt = `Image of ${destination}`;
            imageElement.style.display = 'block'; // Make sure image is visible
        } else {
            imageElement.style.display = 'none'; // Hide image if not available
        }

    } catch (error) {
        console.error("Error:", error.message);
        if (error.message.includes("Location data not found")) {
            alert("No location data found. Please enter a valid destination.");
        } else if (error.message.includes("Weather data not found")) {
            alert("No weather data found. Please try again later.");
        } else if (error.message.includes("Image data not found")) {
            alert("No image data found. Please try again later.");
        } else {
            alert("An error occurred while processing your request. Please try again.");
        }
    }
}
