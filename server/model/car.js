var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var carSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

carSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Car', carSchema, 'car');