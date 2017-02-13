var mongoose = require('mongoose');

// TODO: Add schema plugins

var userSchema = mongoose.Schema({
    name: String
});

module.exports = mongoose.model('User', userSchema, 'user');