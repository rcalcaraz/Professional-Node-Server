// Load dependencies
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Car = require('../server/model/car.js');
var User = require('../server/model/user.js');
var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var server = require('../app.js');

chai.use(chaiHttp);

describe('[Cars TEST]', function() {

    // token for endpoints with authentication
    var userToken;
    var adminToken;

    // remove users
    before(function(done) {
        User.remove({}, function(err) {
            if (!err) {
                done();
            }
        });
    });

    // add one admin
    before(function(done) {
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

    // add one standard user
    before(function(done) {
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

    // get a user token 
    beforeEach(function(done) {
        User.findOne({ role: 'user' }, function(err, user) {
            chai.request(server)
                .post('/session')
                .send({ name: user.name, password: user.password })
                .end(function(err, res) {
                    userToken = res.body.token;
                    done();
                });
        });
    });

    // get a admin token 
    before(function(done) {
        User.findOne({ role: 'admin' }, function(err, user) {
            chai.request(server)
                .post('/session')
                .send({ name: user.name, password: user.password })
                .end(function(err, res) {
                    adminToken = res.body.token;
                    done();
                });
        });
    });

    // remove cars before each test
    beforeEach(function(done) {
        Car.remove({}, function(err) {
            if (!err) {
                done();
            }
        });
    });

    describe('/GET cars', function() {

        it('it should not GET all the cars without a token', function(done) {
            chai.request(server)
                .get('/cars')
                .end(function(err, res) {
                    res.should.have.status(403);
                    res.body.should.be.empty;
                    done();
                });
        });

        it('it should not GET all the cars without a valid token', function(done) {
            var invalidToken = "1234";
            chai.request(server)
                .get('/cars')
                .set('x-access-token', invalidToken)
                .end(function(err, res) {
                    res.should.have.status(403);
                    res.body.should.be.empty;
                    done();
                });
        });

        it('it should GET all the cars', function(done) {
            chai.request(server)
                .get('/cars')
                .set('x-access-token', userToken)
                .end(function(err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });

    describe('/GET/:id car', function() {

        it('it should not GET a car by the given id without valid token', function(done) {
            var car = new Car({
                name: "Clio"
            });
            car.save(function(err, car) {
                chai.request(server)
                    .get('/cars/' + car._id)
                    .end(function(err, res) {
                        res.should.have.status(403);
                        res.body.should.be.empty;
                        done();
                    });
            });
        });

        it('it should GET a car by the given id', function(done) {
            var car = new Car({
                name: "Clio"
            });
            car.save(function(err, car) {
                chai.request(server)
                    .get('/cars/' + car._id)
                    .set('x-access-token', userToken)
                    .end(function(err, res) {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('name');
                        done();
                    });
            });
        });

        it('it should not GET a car with a invalid id', function(done) {
            var invalidId = "1234"
            chai.request(server)
                .get('/cars/' + invalidId)
                .set('x-access-token', userToken)
                .end(function(err, res) {
                    res.should.have.status(404);
                    res.body.should.be.empty;
                    done();
                });
        });
    });

    describe('/POST car', function() {
        it('it should not POST a car without a token', function(done) {
            var car = new Car({
                name: "Golf"
            });
            chai.request(server)
                .post('/cars')
                .send(car)
                .end(function(err, res) {
                    res.should.have.status(403);
                    res.body.should.be.empty;
                    done();
                });
        });

        it('it should POST a car', function(done) {
            var car = new Car({
                name: "Golf"
            });
            chai.request(server)
                .post('/cars')
                .send(car)
                .set('x-access-token', userToken)
                .end(function(err, res) {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('name').eql(car.name);
                    done();
                });
        });
        it('it should not POST a car without name field', function(done) {
            var car = new Car({});
            chai.request(server)
                .post('/cars')
                .send(car)
                .set('x-access-token', userToken)
                .end(function(err, res) {
                    res.should.have.status(400);
                    done();
                });
        });
        it('it should not POST a car with a repeated name', function(done) {
            var car = new Car({
                name: "Golf"
            });
            car.save(function(err, car) {
                chai.request(server)
                    .post('/cars')
                    .send(car)
                    .set('x-access-token', userToken)
                    .end(function(err, res) {
                        Car.find({ name: car.name }, function(err, cars) {
                            cars.length.should.be.below(2);
                            res.should.have.status(409);
                            res.body.should.be.empty;
                            done();
                        });
                    });
            });
        });
    });

    describe('/PUT/:id car', function() {
        it('it should UPDATE a car by the given id', function(done) {
            var car = new Car({
                name: "Golf"
            });
            car.save(function(err, car) {
                car.name = "Clio";
                chai.request(server)
                    .put('/cars/' + car._id)
                    .send(car)
                    .set('x-access-token', userToken)
                    .end(function(err, res) {
                        res.should.have.status(200);
                        res.body.should.have.property('name').eql(car.name);
                        done();
                    });
            });
        });
        it('it should not UPDATE a car by with a repeated name', function(done) {
            var car = new Car({
                name: "Golf"
            });
            var car2 = new Car({
                name: "Clio"
            });

            car.save(function(err, car) {
                car2.save(function(err, car2) {
                    car2.name = "Golf";
                    chai.request(server)
                        .put('/cars/' + car2._id)
                        .send(car2)
                        .set('x-access-token', userToken)
                        .end(function(err, res) {
                            res.should.have.status(409);
                            res.body.should.be.empty;
                            done();
                        });
                });
            });
        });
        it('it should not UPDATE a car by with a invalid id', function(done) {
            var car = new Car({
                name: "Golf"
            });
            invalidId = "1234";
            chai.request(server)
                .put('/cars/' + invalidId)
                .send(car)
                .set('x-access-token', userToken)
                .end(function(err, res) {
                    res.should.have.status(404);
                    res.body.should.be.empty;
                    done();
                });

        });
    });

    describe('/DELETE/:id car', function() {
        it('it should not DELETE a car by the given id with a standard user token', function(done) {
            var car = new Car({
                name: "Golf"
            });
            car.save(function(err, car) {
                chai.request(server)
                    .delete('/cars/' + car._id)
                    .set('x-access-token', userToken)
                    .end(function(err, res) {
                        res.should.have.status(403);
                        res.body.should.be.empty;
                        done();
                    });
            });
        });

        it('it should DELETE a car by the given id', function(done) {
            var car = new Car({
                name: "Golf"
            });
            car.save(function(err, car) {
                chai.request(server)
                    .delete('/cars/' + car._id)
                    .set('x-access-token', adminToken)
                    .end(function(err, res) {
                        res.should.have.status(200);
                        res.body.should.have.property('name').eql(car.name);
                        done();
                    });
            });
        });

        it('it should not DELETE with a invalid id', function(done) {
            var invalidId = '1234';
            chai.request(server)
                .delete('/cars/' + invalidId)
                .set('x-access-token', adminToken)
                .end(function(err, res) {
                    res.should.have.status(404);
                    res.body.should.be.empty;
                    done();
                });
        });
    });
});