# 1. Project Title
Evaluate a news article with Natural Language Processing.

# 2. Overview
A single-page application created for the Udacity Frontend Web Developer Nanodegree is called Evaluate a News Article with NLP. With the MeaningCloud Sentiment Analysis API, this project enables users to submit an actual URL and obtain an assessment of the sentiment of the content.

The application provides light on the piece's subjectivity, irony, polarity, confidence, and agreement irony, polarity, confidence, and agreement of the piece. The project uses tools like Sass for styling, Jest for testing, and Webpack for building automation. Its goal is to give students practical experience with these technologies and an understanding of their functions in developing front-end applications.

# 3. Features
1. Sentiment Analysis: Users can input a URL, and the app will analyze the article’s content for sentiment, providing detailed feedback on various aspects such as subjectivity, irony, and polarity.
2. Offline Support: The application uses a Service Worker to enable offline functionality and improve performance by caching necessary assets.
3. Responsive Design: The UI is designed to be responsive, ensuring a seamless experience across different devices and screen sizes.
4. Error Handling: The application includes robust error handling to manage issues such as invalid URLs and API request failures.

# 4. Technologies
1-  Web-server: Node.js 
controls the management of requests and backend server functions.

2- Framework for Web Applications: Express
makes API management and backend server routing easier.

3- Build tool: Webpack.
Webpack is employed to bundle and optimize the application's assets:
.Development Mode: Provides an efficient workflow with source maps and live reloading.
.Production Mode: Optimizes the build for deployment by minifying and bundling code, ensuring faster load times and better performance.

4- External Script: Service Worker
The Service Worker script enhances the application's performance by caching static assets, providing offline access, and improving load times on subsequent visits.

5- External API: MeaningCloud 
The MeaningCloud Sentiment Analysis API is the core of the application, offering natural language processing capabilities to evaluate the sentiment of news articles. It analyzes various elements such as sentiment, subjectivity, and irony, and returns a detailed report.

# 5. Styling: Sass
Sass is used to write maintainable and modular stylesheets, allowing for better organization and reusability of CSS code.

# 6. Testing: Jest
Jest is utilized for testing JavaScript functions to ensure that the application's logic is working as expected.

# 7. Installation
1- Clone the repo: To install this project repository, use the following command: git clone
https://github.com/beesan-ahmad/Evaluate-a-news-article-with-Natural-Language-Processing.git

2- Install npm dependencies: run this command in your terminal:
 npm install

3- Create an account on  [meaning cloud](https://www.meaningcloud.com/) then take your api key.

4- create a new file in your root directory called .env and put your:
 "API_KEY = your_api_key"

5- Run the app
1. Run the application in development mode:
  npm run build-dev

2. Run the application in production mode:
  npm run build-prod

3. Start the server:
  npm run start

4. Run testing
  npm run test    

# 8. Usage
1- Enter the URL of a news article in the input field.
2- Click the "Evaluate" button to submit the URL.
3- View the sentiment analysis results displayed on the page.

# 9. Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes.