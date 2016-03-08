var Promise = require('./promise');

function Route(path,controllers,context) {
	
	var route = this;;
	
	this.context = context;
	this.controllers = controllers;
	this.params = [];
	this.regex = path;
	this.path = path;
	this.parts = path.split('/');
	
	this.params = path.match(/:([^\/]+)/ig);
	
	if (this.params) {
		
		this.params.forEach(function (param) {
			
			route.regex = route.regex.replace(param,'([a-zA-Z0-9]+)')
			
		});
		
	}
	
	this.regex = new RegExp(this.regex,'i');
	
}

Route.prototype.controller = function (scope,request,response) {
	
	return this.controllers[request.method](scope,request,response);
	
};

Route.prototype.match = function (scope,request) {
	
	var path = request.url.pathname || '/', 
		match = this.regex.exec(path);
	
	if (null !== match && match[0] === path) {
		
		console.log('route match',this.path);
		
		scope.route = this;
		
		if (this.params) {
			
			this.params.forEach(function (param,index) {
				
				request.query[param.replace(':','')] = match[index + 1];
				
			});
			
		}
		
		return true;
		
	}
	
	return false;
	
};

module.exports = Route;