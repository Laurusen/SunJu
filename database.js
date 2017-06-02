var user = [];

user.push({
	id : 1,
	login : 'admin',
	password : '123',
	sid : null
});

user.push({
	id : 2,
	login : 'user',
	password : 'user',
	sid : null
});

user.push({
	id : 3,
	login : 'red',
	password : 'red',
	sid : null
});

exports.userVerif = (reqUser) => {

	for (var i = 0; i < user.length; i++) {

		if (user[i].login === reqUser.login && user[i].password === reqUser.password) {			

			user[i].sid = Math.floor((Math.random() * 100) + 1);
			return user[i].sid;

		}

	}
	
};

exports.getUserBySid = (sid) => {
	var data = false;

	user.forEach((item) => {
		if (item.sid == parseInt(sid))
			data = item;
	});

	return data;
};