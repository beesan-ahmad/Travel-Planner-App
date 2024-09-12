import { handleTravelForm } from './js/travelHandler';
import {fetchLocationData, fetchWeatherData, fetchImageData} from './js/api'
import { getTripDuration, getDaysUntilDeparture } from './js/utils';
import './styles/resets.scss';
import './styles/base.scss';
import './styles/footer.scss';
import './styles/form.scss';
import './styles/header.scss';

// Add event listener to the form
document.getElementById('travel-form').addEventListener('submit', handleTravelForm);


// try {
//     const destination = document.getElementById('destination').value;
//     const startDate = document.getElementById('start-date').value;
//     const endDate = document.getElementById('end-date').value;

//     const cityLocation = await fetchLocationData(destination);
//     const cityWeather = await fetchWeatherData(cityLocation.lat, cityLocation.lon);
//     const cityImage = await fetchImageData(destination);

//     // Calculating the trip details
//     const daysUntilTrip = getDaysUntilDeparture(startDate);
//     const tripDuration = getTripDuration(startDate, endDate);
//     console.log(`Days until trip: ${daysUntilTrip}, Trip duration: ${tripDuration}`);
    
//     // Update the UI
//     document.getElementById('days-until-trip').textContent = `Days until trip: ${daysUntilTrip}`;
//     document.getElementById('trip-duration').textContent = `Trip duration: ${tripDuration} days`;

// } catch (error) {
//     console.error('An error occurred while fetching trip data:', error);
//     alert('Failed to retrieve trip details. Please check your input and try again later.');
// }
