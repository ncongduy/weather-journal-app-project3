// Setup empty JS object to act as endpoint for all routes
const projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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

// POST method route
app.post('/data', (req, res) => {
	projectData['date'] = req.body.date;
	projectData['temperature'] = req.body.temperature;
	projectData['userResponse'] = req.body.userResponse;
	console.log('POST', projectData);
});

// Setup Server
const port = 9000;
app.listen(port, () => {
	console.log(`Weather app listening at http://localhost:${port}`);
});
