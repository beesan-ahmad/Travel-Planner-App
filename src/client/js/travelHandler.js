document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('travel-form');

  form.addEventListener('submit', async (event) => {
      event.preventDefault();

      const location = document.getElementById('location').value;
      const date = document.getElementById('date').value;

      try {
          const response = await fetch('http://localhost:8080/getCity', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ location, date }),
          });

          const data = await response.json();

          if (data.success) {
              document.getElementById('results').innerHTML = `
                  <h2>Weather Forecast for ${location}</h2>
                  <p>${data.message}</p>
              `;
          } else {
              document.getElementById('results').innerHTML = `
                  <p>Error: ${data.message}</p>
              `;
          }
      } catch (error) {
          console.error('Error:', error);
          document.getElementById('results').innerHTML = `
              <p>Something went wrong. Please try again later.</p>
          `;
      }
  });
});
