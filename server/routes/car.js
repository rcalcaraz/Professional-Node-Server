var carRest = require('../rest/car.js');

module.exports = function(app){
	app.get('/api/cars', carRest.getCars);
}