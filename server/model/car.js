var mongoose = require('mongoose');
// TODO: Unique validator

var carSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Car', carSchema, 'car');