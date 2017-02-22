// Load dependencies
var path = require('path');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var User = require(path.join('..', 'server', 'model', 'user.js'));
var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var server = require(path.join('..', 'app.js'));
var jwt = require('jsonwebtoken');

chai.use(chaiHttp);

describe('[Auth TEST]', function() {

    // clean database
    beforeEach(function(done) {
        User.remove({}, function(err) {
            if (!err) {
                done();
            }
        });
    });

    // add one user
    beforeEach(function(done) {
        var user = new User({
            name: 'john',
            password: "pass",
            role: 'user'
        });
        user.save(function(err, user) {
            if (!err) {
                done();
            }
        });
    });

    // add one admin
    beforeEach(function(done) {
        var user = new User({
            name: 'mike',
            password: "pass",
            role: 'admin'
        });
        user.save(function(err, user) {
            if (!err) {
                done();
            }
        });
    });

    // remove all collections
    after(function(done) {
        User.remove({}, function(err) {
            if (!err) {
                done();
            }
        });
    });

    describe('/POST session', function() {
        it('it should POST a new session and return a valid token by the given stored user', function(done) {
            User.findOne({}, function(err, user) {
                chai.request(server)
                    .post('/session')
                    .send(user)
                    .end(function(err, res) {
                        res.should.have.status(200);
                        res.body.should.have.property('token');
                        jwt.verify(res.body.token, process.env.npm_package_config_jwt_secret, function(err, decoded) {
                            should.not.exist(err);
                            done();
                        });
                    });
            });
        });
        it('it should not POST a new session with a no existing user', function(done) {
            var invalidUser = new User({
                name: "not",
                password: "stored"
            })
            chai.request(server)
                .post('/session')
                .send(invalidUser)
                .end(function(err, res) {
                    res.should.have.status(403);
                    done();
                });
        });
    });
});