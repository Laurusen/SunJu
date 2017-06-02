var	http = require('http'),
	route = require('./route');

http.createServer((req, res) => {

	req.on('error', (error) => {
		console.error(error.stack);
	});

	res.on('error', (error) => {
		console.error(error.stack);
	});

	route.run(req, res);

}).listen(80);