// Setup empty JS object to act as endpoint for all routes
const projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

// Use API_KEY from .env
const dotenv = require('dotenv');
dotenv.config();
const apiKey = process.env.API_KEY;

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// GET method route
app.get('/data', (req, res) => {
	console.log('GET', projectData);
	res.send(projectData);
});

app.get('/api', (req, res) => {
	console.log('GET', 'API_KEY');
	res.send({ apiKey });
});

// POST method route
app.post('/data', (req, res) => {
	projectData['date'] = req.body.date;
	projectData['temperature'] = req.body.temperature;
	projectData['userResponse'] = req.body.userResponse;
	console.log('POST', projectData);
});

// Setup Server
const port = process.env.PORT || 9001;
app.listen(port, () => {
	console.log(`Weather app is listening on port:${port}`);
});
