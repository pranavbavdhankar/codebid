const https = require('https');

const options = {
	method: 'GET',
	hostname: 'travel-advisor.p.rapidapi.com',
	port: null,
	path: '/restaurants/list-by-latlng?latitude=12.245&longitude=109.195&limit=30&currency=USD&distance=2&open_now=false&lunit=km&lang=en_US',
	headers: {
		'x-rapidapi-key': '9aa0a563d0msh6ae5aa057fb4e34p1b5a84jsn1c2a0069f6f1',
		'x-rapidapi-host': 'travel-advisor.p.rapidapi.com'
	}
};

const req = https.request(options, function (res) {
	let data = '';

	res.on('data', function (chunk) {
		data += chunk;
	});

	res.on('end', function () {
		console.log(data);
	});
});

req.on('error', function (e) {
	console.error(e);
});

req.end();
