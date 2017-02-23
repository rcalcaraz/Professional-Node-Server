var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator')

var userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', userSchema, 'user');