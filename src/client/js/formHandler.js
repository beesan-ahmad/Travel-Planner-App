import { updateInterface } from "./updateInterface";

export const processSubmission = async (event) => {
  event.preventDefault();

  const inputElement = document.getElementById('article-url');
  if (!inputElement) {
    console.error('Input element not found');
    return;
  }

  const inputUrl = inputElement.value.trim();
  if (!inputUrl) {
    console.error('Input URL is empty');
    return;
  }

  if (validateInputUrl(inputUrl)) {
    try {
      const response = await fetch('http://localhost:3000/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: inputUrl }),
      });

      const responseData = await response.json();
      console.log('Response Data:', responseData); // Debugging line
      updateInterface(responseData);
    } catch (error) {
      console.error('Error during submission:', error);
    }
  } else {
    alert('Please enter a valid URL.');
  }
};

// Example URL validation function
const validateInputUrl = (url) => {
  const pattern = /^https?:\/\/[^\s/$.?#].[^\s]*$/i;
  return pattern.test(url);
};
