var user = [];

user.push({
	id : 1,
	login : 'admin',
	password : '123',
	online : false,
	sid : null
});

user.push({
	id : 2,
	login : 'user',
	password : 'user',
	online : false,
	sid : null
});

user.push({
	id : 3,
	login : 'red',
	password : 'red',
	online : false,
	sid : null
});

exports.userVerif = (reqUser) => {
	var answer = false;

	user.forEach((item) => {
		if (item.login === reqUser.login && item.password === reqUser.password) {
			item.sid = Math.floor((Math.random() * 100) + 1);
			item.online = true;
			answer = item.sid;
			return;
		}
	});

	return answer;
};

exports.getUserBySid = (sid) => {
	var data = false;

	user.forEach((item) => {
		if (item.sid == parseInt(sid))
			data = item;
	});

	return data;
};