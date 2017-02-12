// During the test the env variable is set to test
process.env.NODE_ENV = 'test';

// Load dependencies
var mongoose = require('mongoose');
var Car = require('../server/model/car.js');
var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var server = require('../app.js');

chai.use(chaiHttp);

describe('[Cars TEST]', function() {
    beforeEach(function(done) {
        Car.remove({}, function(err) {
            done();
        });
    });

    describe('/GET cars', function() {
        it('it should GET all the cars', function(done) {
            chai.request(server)
                .get('/cars')
                .end(function(err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });

    describe('/GET/:id car', function() {
        it('it should GET a car by the given id', function(done) {
            let car = new Car({
                name: "Clio"
            });
            car.save(function(err, car) {
                chai.request(server)
                    .get('/car/' + car._id)
                    .end(function(err, res) {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('name');
                        done();
                    });
            });
        });

        it('it should not GET a car with a invalid id', function(done) {
            let invalidId = "1234"
            chai.request(server)
                .get('/car/' + invalidId)
                .end(function(err, res) {
                    res.should.have.status(404);
                    res.body.should.be.empty;
                    done();
                });
        });
    });

    describe('/POST car', function() {
        it('it should POST a car', function(done) {
            let car = new Car({
                name: "Golf"
            });
            chai.request(server)
                .post('/car')
                .send(car)
                .end(function(err, res) {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('name').eql(car.name);
                    done();
                });
        });
        it('it should not POST a car without name field', function(done) {
            let car = new Car({});
            chai.request(server)
                .post('/car')
                .send(car)
                .end(function(err, res) {
                    res.should.have.status(400);
                    done();
                });
        });
        it('it should not POST a car with a repeated name', function(done) {
            let car = new Car({
                name: "Golf"
            });
            car.save(function(err, car) {
                chai.request(server)
                    .post('/car')
                    .send(car)
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
            let car = new Car({
                name: "Golf"
            });
            car.save(function(err, car) {
                car.name = "Clio";
                chai.request(server)
                    .put('/car/' + car._id)
                    .send(car)
                    .end(function(err, res) {
                        res.should.have.status(200);
                        res.body.should.have.property('name').eql(car.name);
                        done();
                    });
            });
        });
        it('it should not UPDATE a car by with a repeated name', function(done) {
            let car = new Car({
                name: "Golf"
            });
            let car2 = new Car({
                name: "Clio"
            });

            car.save(function(err, car) {
                car2.save(function(err, car2) {
                    car2.name = "Golf";
                    chai.request(server)
                        .put('/car/' + car2._id)
                        .send(car2)
                        .end(function(err, res) {
                            res.should.have.status(409);
                            res.body.should.be.empty;
                            done();
                        });
                });
            });
        });
        it('it should not UPDATE a car by with a invalid id', function(done) {
            let car = new Car({
                name: "Golf"
            });
            invalidId = "1234";
            chai.request(server)
                .put('/car/' + invalidId)
                .send(car)
                .end(function(err, res) {
                    res.should.have.status(404);
                    res.body.should.be.empty;
                    done();
                });

        });
    });

    describe('/DELETE/:id car', function() {
        it('it should DELETE a car by the given id', function(done) {
            let car = new Car({
                name: "Golf"
            });
            car.save(function(err, car) {
                chai.request(server)
                    .delete('/car/' + car._id)
                    .end(function(err, res) {
                        res.should.have.status(200);
                        res.body.should.have.property('name').eql(car.name);
                        done();
                    });
            });
        });
        it('it should not DELETE with a invalid id', function(done) {
            let invalidId = '1234';
            chai.request(server)
                .delete('/car/' + invalidId)
                .end(function(err, res) {
                    res.should.have.status(404);
                    res.body.should.be.empty;
                    done();
                });
        });
    });
});