var mongoose = require('mongoose');

var carSchema = mongoose.Schema({
  	name: String
});

module.exports = mongoose.model('Car', carSchema, 'car');
