# 1. Project Title
FEND Capstone - Travel App

# 2. Overview
The Travel App is a single-page application created for the Udacity Frontend Web Developer Nanodegree. It allows users to plan trips by providing the weather forecast and location images for their destination. The app utilizes multiple APIs, including Geonames for location data, Weatherbit for weather information, and Pixabay for images.

The project demonstrates how to integrate APIs, manage asynchronous data flow, and implement a seamless user experience using modern web technologies like Webpack, Sass, and Jest. The app also supports offline functionality using a Service Worker to provide a more robust and resilient experience for users.

# 3. Features
Trip Planning: Users can input a destination and travel date to receive weather information and images of the location.
Current and Future Weather Forecast: Depending on the travel date, the app will display either the current weather (for trips within a week) or a future weather forecast.
Offline Support: The app uses a Service Worker to provide offline functionality and improved performance by caching key assets.
Responsive Design: The UI is optimized to provide a smooth experience across different screen sizes, ensuring usability on both mobile and desktop devices.
Error Handling: Comprehensive error handling ensures that invalid input or failed API requests are managed gracefully, providing informative feedback to the user.

# 4. Technologies
Web-server: Node.js
Manages requests and backend server functions.

Web Application Framework: Express
Simplifies API handling and backend routing.

Build Tool: Webpack
Bundles and optimizes the application's assets for better performance.

Development Mode: Provides an efficient workflow with source maps and live reloading.
Production Mode: Minifies and bundles code for optimal load times and performance.
Service Worker
Improves the app’s performance by caching assets and providing offline access, ensuring faster subsequent load times.

APIs:

Geonames API: Provides geographical data, such as city coordinates and country information.
Weatherbit API: Supplies current or future weather forecasts based on the user’s travel dates.
Pixabay API: Delivers images of the destination, enhancing the user’s visual experience.

# 5. Styling: Sass
Sass is utilized for organizing and maintaining the app's stylesheets, enabling reusable and modular CSS code.

# 6. Testing: Jest
Jest is used for testing JavaScript functions to ensure the correctness and robustness of the app's logic.

# 7. Installation
Clone the repository:
Run the following command in your terminal:
git clone https://github.com/beesan-ahmad/Travel-Planner-App.git

Install npm dependencies:
Navigate to the project directory and run:
npm install

API Setup:
Create accounts for the following APIs:
Geonames
Weatherbit
Pixabay
Obtain your API keys from each service.

Create a .env file in the root directory with the following content:
GEONAMES_USERNAME=your_geonames_username
WEATHERBIT_API_KEY=your_weatherbit_api_key
PIXABAY_API_KEY=your_pixabay_api_key

Run the app:
Development Mode:
npm run build-dev

Production Mode:
npm run build-prod

Start the server:
npm run start

Run tests:
npm run test

# 8. Usage
Enter a destination in the input field (e.g., "Palestine").
Provide the travel date.
Click the "Submit" button.
The app will display the weather forecast and a relevant image of the destination based on the input.

# 9. Contributing
Contributions are welcome! If you'd like to contribute, please fork the repository, create a new branch, and submit a pull request with your changes.