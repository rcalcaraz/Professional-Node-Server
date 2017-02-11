//During the test the env variable is set to test
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

    describe('/POST car', function() {
        it('it should not POST a car without name field', function(done) {
            var car = {}
            chai.request(server)
                .post('/car')
                .send(car)
                .end(function(err, res) {
                    res.should.have.status(400);
                    done();
                });
        });
    });
});