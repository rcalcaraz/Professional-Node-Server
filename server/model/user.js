var mongoose = require('mongoose');

// TODO: Add schema plugins
// TODO: Bcrypt password

var userSchema = mongoose.Schema({
    name: String,
    password: String
});

module.exports = mongoose.model('User', userSchema, 'user');