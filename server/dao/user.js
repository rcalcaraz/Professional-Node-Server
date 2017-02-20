// Database Models
var User = require('../model/user.js');

module.exports = {

    getAll: function(callback) {
        User.find({}, function(err, users) {
            callback(err, users);
        });
    },

    getById: function(id, callback) {
        User.findById(id, function(err, user) {
            callback(err, user);
        })
    },

    getByName: function(name, callback) {
        User.findOne({ name: name }, function(err, user) {
            callback(err, user);
        });
    },

    create: function(user, callback) {
        var newUser = new User(user);
        newUser.save(function(err, user) {
            callback(err, user);
        })
    },

    delete: function(id, callback) {
        User.findByIdAndRemove(id, function(err, user) {
            callback(err, user);
        });
    }
}