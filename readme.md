# Full Stack Developer Test - URL Shortener


# My Test Project

For this project, I decided to use Node.js as the main framework for the Backend and simple JavaScript for the Frontend. 
I chose Node because I wanted to create something complete and stable within a single solution. 
I relied on Express for route and API management, and I used an external file, specifically a JSON file, to store all the information. 
I chose this over an external database because it allowed me to have something concrete and stable from the start.
If I had more time, I would have adopted the idea of using an external database to provide extra security for the data.

Inside, you will find:

- function that creates a short URL from a Long URL (the DB is set with an expiration time of 2 minutes)
- function to retrieve the original URL, if it exists and hasn’t expired
- function to download the JSON file
- function to clear the entire form

LifeCycle of project

1. Client Interecation:
The client enters the long URL, for example:
"http://localhost:3000/questo/è/un/link/lungo"
And click the button "Generate a Shorten URL". The onclick event is triggered, retrieving the Long URL and calling the /shorten API via a POST request.

2. URL Shortening:
The application generates a random code (e.g., "xp4ZS") and stores it in the database. The database entry will consist of the random code as the key, with the original URL and its expiration date inside an object. For example:

3. Database Structure:

{
  "xp4ZS": {
    "url": "http://localhost:3000/questo/è/un/link/lungo",
    "expirationDate": "2025-01-27T20:59:04.058Z"
  }
}

4. Short URL Creation:
The client is given a shortened URL, for example:
"http://localhost:3000/xp4ZS"

5. Client Interaction:
The client enters the shortened URL into a field and clicks the "Find the Original URL" button. The onclick event is triggered, retrieving the final part of the shortened URL (e.g., "xp4ZS") and calling the /id API via a GET request.

6. Server Action:
The server receives the code from the client and queries the database to check if there is an entry matching the code (e.g., "xp4ZS").

6. Validation:
If the code exists in the database, the server checks whether the URL has expired by comparing the current date with the stored expiration date. If the URL is not expired, the original URL is returned to the client. Otherwise, an error message or a notice about expiration is sent back.




Next Steps:

Adding a real database
Adding user authentication, with registration via form
Authentication control
Adding a framework (React/Vue) to improve the UI

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (Node Package Manager)

### Installation

1. Clone the repository or download the project files.
2. Navigate to the project directory:

   ```
   cd "adk-url-shortner-challenge
   ```

3. Install the dependencies:

   ```
   npm install
   ```

### Running the Application

To start the server, run the following command:

```
node src/app.js
```

The application will be running at `http://localhost:3000`.

### Accessing the Web Page

Open your web browser and go to `http://localhost:3000` to view the HTML page.

## License

This project is licensed under the MIT License.

