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
            chai.request('localhost:3000')
                .get('/cars')
                .end(function(err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });
});