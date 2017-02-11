var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var carSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
});

carSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Car', carSchema, 'car');