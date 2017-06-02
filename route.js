var	handler = require('./handler');

exports.run = (req, res) => {
	pageName = req.url.split('/')[1];
	pageName = pageName === '' ? 'index' : pageName;

	if(typeof handler[pageName] === 'function'){
		handler[pageName](req, res);
	} else {
		handler.defaultHandle(req, res);
	}
};