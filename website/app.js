/* Global Variables */
const $ = document.getElementById.bind(document);
const generateBtn = $('generate');
const userFeelings = $('feelings');
const localServer = 'http://localhost:9001/data';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();

// function render to UI
function render({ date, temperature, userResponse }) {
	const dateElement = $('date');
	const tempElement = $('temp');
	const contentElement = $('content');

	if (!date || !temperature || !userResponse) return;

	dateElement.innerHTML = 'Date: ' + date;
	tempElement.innerHTML = 'Temperature: ' + temperature + '&#8451;';
	contentElement.innerHTML = 'Your thinking: ' + userResponse;
}

// async function GET data from server.js
async function getDataFromServer() {
	try {
		const fetchData = await fetch(localServer);
		const dataResponse = await fetchData.json();

		return dataResponse;
	} catch (error) {
		alert(error);
	}
}

async function getApiKeyFromServer() {
	try {
		const fetchData = await fetch('http://localhost:9001/api');
		const dataResponse = await fetchData.json();

		return dataResponse.apiKey;
	} catch (error) {
		alert(error);
	}
}

// async function GET data from www.openweathermap.org
async function getDataFromOpenweather(apiKey) {
	try {
		const zipcode = $('zip');
		const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipcode.value},us&appid=${apiKey}`;
		const fetchData = await fetch(url);
		const dataResponse = await fetchData.json();
		const temperature = (parseInt(dataResponse.main.temp) - 273).toString();

		// Save dataResponse to object
		const data = {
			date: newDate,
			temperature,
			userResponse: userFeelings.value,
		};

		return data;
	} catch (error) {
		alert(error);
	}
}

// async function POST data to server.js
async function postDataToServer(data) {
	try {
		fetch(localServer, {
			method: 'POST',
			mode: 'cors',
			cache: 'no-cache',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json',
			},
			redirect: 'follow',
			referrerPolicy: 'no-referrer',
			body: JSON.stringify(data),
		});

		return data;
	} catch (error) {
		alert(error);
	}
}

// function clear input
function clearInput() {
	const userResponse = $('feelings');
	const zipcode = $('zip');

	zipcode.value = '';
	userResponse.value = '';
}

// GET data from server.js, then render to UI
getDataFromServer()
	.then((data) => render(data))
	.catch((error) => alert(error));

// GET data from www.openweathermap.org, then POST data to server.js, then update to UI
function handleDynamicUpdateUI() {
	getApiKeyFromServer()
		.then((api) => getDataFromOpenweather(api))
		.then((data) => postDataToServer(data))
		.then((data) => render(data))
		.then(() => clearInput())
		.catch((error) => alert(error));
}

// Create event listener for generate button
generateBtn.addEventListener('click', handleDynamicUpdateUI);

// Create event listener when press Enter
document.addEventListener('keypress', (evt) => {
	if (evt.key === 'Enter') {
		handleDynamicUpdateUI();
	}
});
