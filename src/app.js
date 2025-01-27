// Code to run the server
/***
 * 
 * 
 * For this project, I decided to use Node.js as the main framework for the Backend and simple JavaScript for the Frontend. 
 * I chose Node because I wanted to create something complete and stable within a single solution. 
 * I relied on Express for route and API management, and I used an external file, specifically a JSON file, to store all the information. 
 * I chose this over an external database because it allowed me to have something concrete and stable from the start. 
 * If I had more time, I would have adopted the idea of using an external database to provide extra security for the data.

    Inside, you will find:

    - function that creates a short URL from a Long URL (the DB is set with an expiration time of 2 minutes)
    - function to retrieve the original URL, if it exists and hasn’t expired
    - function to download the JSON file
    - function to clear the entire form

    Next Steps:

    - Adding a real database
    - Adding user authentication, with registration via form
    - Authentication control
    - Adding a framework (React/Vue) to improve the UI
 * 
 * 
 * SERVER
 * The server will be created using the Express framework.to create a server that will handle the requests from the client side.
 * 
 * 
 * API ENDPOINTS
 * POST endpoint to shorten the URL
 * GET endpoint to find the original URL
 * GET endpoint to download the fake database
 * 
 * 
 * DATABASE
 * The database will be a JSON file that will be stored in the fakeDB folder.
 * 
 * For simplicity and time constraints, I chose to use a JSON file as a database. 
 * This way, I could simulate the functionality of a database by reading and writing from a file. 
 * I know it's not the best choice in terms of performance and security, 
 * but I wanted to create something simple and quick.
 */
const express = require('express');
//to work with paths
const path = require('path');
//body parser to parse the body of the request
const bodyParser = require('body-parser');
//nanoid to generate random ids
const {nanoid} = require('nanoid');
//fs to work with files
const fs = require('fs');
//to work with file paths
const e = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//to see the public folder ( static files )
app.use(express.static(path.join(__dirname, '../public')));
app.use('/scripts', express.static(path.join(__dirname, '../scripts')));
app.use('/fakeDB', express.static(path.join(__dirname, '../fakeDB')));


//fake database to store the urls (inside a json file)
const databasePath = path.join(__dirname, '../fakeDB/fake_database.json');

//function to read the database
const readDatabase = () =>{
    const data = fs.readFileSync(databasePath,'utf-8');
    return JSON.parse(data);
}

//function to write the database
const writeDatabase = (data) =>{
    fs.writeFileSync(databasePath, JSON.stringify(data));
}


//routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

//shorten the url
app.post('/shorten', (req, res) => {
    const {url} = req.body
    if(url === ''){
        res.status(400).send('URL cannot be empty');
    }
    const urlDatabase = readDatabase();
    const id = nanoid(5);
    const expirationDate = new Date(Date.now() + 2 * 60000); // 1 minute from now
    urlDatabase[id] = {url, expirationDate};
    writeDatabase(urlDatabase);
    res.json({shortURL:`http://localhost:${PORT}/${id}`});
});

// download the database
app.get('/download', (req, res) => {
    const db = readDatabase();
    res.json(db);
});

//find the original url
app.get('/:id', (req, res) => {
    const id = req.params.id;
    const db = readDatabase();
    const originalURL = db[id];
    if(originalURL) {
        if(new Date(originalURL.expirationDate) > new Date()){
            res.json(originalURL.url);
        }else{
            res.status(404).send('URL expired');
        }
    }else{
        res.status(404).send('URL not found');
    }
});

//start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});