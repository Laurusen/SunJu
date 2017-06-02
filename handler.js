
var	fs = require('fs'),
	path = require('path'),
	querystring = require('querystring'),
	database = require('./database');

//--- index ------------------------------------------------------------------------------------

exports.index = (req, res) => {

	var pageFile = path.join(__dirname, 'public', 'html', 'index.html');
	var fStream = fs.createReadStream(pageFile);

	fStream.on('error', (error) => {

		console.error(error.stack);
		res.writeHead(404, {'Content-Type':'text/html'});
		res.end('404 | File not found');

	});
	
	res.writeHead(200, {'Content-Type':'text/html'});
	fStream.pipe(res);
};

//--- login ------------------------------------------------------------------------------------

exports.login = (req, res) => {

	var pageFile = path.join(__dirname, 'public', 'html', 'login.html');
	var fStream = fs.createReadStream(pageFile);

	fStream.on('error', (error) => {

		console.error(error.stack);
		res.writeHead(404, {'Content-Type':'text/html'});
		res.end('404 | File not found');

	});
	
	res.writeHead(200, {'Content-Type':'text/html'});
	fStream.pipe(res);
};

//--- action ------------------------------------------------------------------------------------

exports.action = (req, res) => {

	var body = [], reqUser = '', msg = '';

	req.on('data', (chunk) => {

		body.push(chunk);

	}).on('end', () => {

		reqUser = querystring.parse(Buffer.concat(body).toString());
		var sid = database.userVerif(reqUser);

		if (sid) {

			var date = new Date(), seconds = 30;

			res.writeHead(302, {
				'Location':'/index',
				'Set-Cookie' : 'sid=' + sid + ';expires=' + date.toUTCString(date.setSeconds(date.getSeconds() + seconds))
			});

			res.end();
			return;

		} else {
			msg = 'Wrong login or password';
		}

		res.writeHead(200, {'Content-Type':'text/html'});
		res.end(msg);

	});	
};

//--- defaultHandle ------------------------------------------------------------------------------------

exports.defaultHandle = (req, res) => {

	var pageFile = path.join(__dirname, 'public', req.url);
	var fStream = fs.createReadStream(pageFile);

	fStream.on('error', (error) => {

		console.error(error.stack);
		res.writeHead(404, {'Content-Type':'text/html'});
		res.end('404 | File not found');

	});

	fStream.pipe(res);	
};

//--- ajax ------------------------------------------------------------------------------------

exports.ajax = (req, res) => {

	var cookie = querystring.parse(req.headers.cookie);
	var user = database.getUserBySid(cookie.sid);
	
	if (user) {

		res.writeHead(200, {'Content-Type':'application/json'});
		res.end(JSON.stringify(user));

	} else {

		res.end('404');

	}
};