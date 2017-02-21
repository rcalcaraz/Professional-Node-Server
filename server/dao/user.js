var path = require('path');
var User = require(path.join('..', 'model', 'user.js'));
var bcrypt = require('bcrypt');
const saltRounds = 10;

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
        bcrypt.hash(user.password, saltRounds, function(err, hash) {
            var newUser = new User(user);
            newUser.password = hash;
            newUser.save(function(err, user) {
                callback(err, user);
            });
        });

    },

    delete: function(id, callback) {
        User.findByIdAndRemove(id, function(err, user) {
            callback(err, user);
        });
    }
}