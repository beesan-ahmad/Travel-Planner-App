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
        // Fetch location, weather, and image data using your existing API calls
        const locationData = await fetchLocationData(destination);
        const { lat, lng } = locationData;

        const weatherData = await fetchWeatherData(lat, lng);
        const imageData = await fetchImageData(destination);

        // Update DOM to display results
        // Calculate and display trip details
        const daysUntilTrip = getDaysUntilDeparture(startDate);
        const tripDuration = getTripDuration(startDate, endDate);

        document.getElementById('days-until-trip').textContent = `Days until trip: ${daysUntilTrip}`;
        document.getElementById('trip-duration').textContent = `Trip duration: ${tripDuration} days`;

        document.getElementById('start-date-display').textContent = `Start date: ${startDate}`;
        document.getElementById('end-date-display').textContent = `End date: ${endDate}`;

        // Check if the image data exists, then update the DOM to display the image
        if (imageData && imageData.webformatURL) {
            const imageElement = document.getElementById('destination-image');
            imageElement.src = imageData.webformatURL;  // Set the image source to the fetched image URL
            imageElement.alt = `Image of ${destination}`;  // Provide alt text for the image
        } else {
            // If no image is found, display a placeholder or error message
            document.getElementById('destination-image').src = 'placeholder.jpg'; // Fallback image
            document.getElementById('destination-image').alt = 'No image available';
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while processing your request.");
    }
}
