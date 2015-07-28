var base = process.env.PWD;

var Framework = require(+'/framework');

var Id = require('../../attributes/post/id');

module.exports = function (config) {
	
	var form;
	
	config = config || {};
	
	if (undefined === config.attributes) {
		
		config.attributes = {
			id: Id
		};
		
	}
	
	form = new Framework.Form(config);
	
	return form;
	
};