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
      console.log(data);

      if (!data || !data.geonames || data.geonames.length === 0) {
          throw new Error("No location data found for the given destination.");
      }

      return data.geonames[0];
  } catch (error) {
      console.error("Error fetching location data:", error);
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

      // Assuming additional logic here to handle weather data, etc.
      console.log("Location Data:", locationData);

  } catch (error) {
      console.error("Error handling travel form submission:", error);
  }
}

document.getElementById('travel-form').addEventListener('submit', handleTravelForm);
