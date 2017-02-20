var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var User = require('../dao/user.js');

var checkPassword = function(name, password, callback) {
    User.getByName(name, function(err, user) {
        if (!user) {
            err = true;
            callback(err, user);
        } else {
            bcrypt.compare(password, user.password, function(bcryptErr, res) {
                if (bcryptErr) {
                    err = true;
                }
                callback(err, user);
            });
        }
    });
}

module.exports = {

    create: function(req, res) {
        if (!req.body.name || !req.body.password) {
            res.status(400).json();
        } else {
            checkPassword(req.body.name, req.body.password, function(err, user) {
                if (err) {
                    res.status(403).json();
                } else {
                    var token = jwt.sign({ user: user }, process.env.JWT_SECRET);
                    if (token) {
                        var session = { token: token };
                        res.status(200).json(session);
                    } else {
                        res.status(500).json();
                    }
                }
            });
        }
    }
}