'use strict';

var users = require('./user')

module.exports = function(app){ 
	app.route('/api/login').post(users.userLogin);
};