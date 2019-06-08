const expect  = require('chai').expect;
const request = require('request');


it('Status 200', function(done) {
    this.timeout(10000);
    request('http://localhost:3000' , function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
    });
});

it('Status 404', function(done) {
    this.timeout(10000);
    request('http://localhost:3000/somenonsense' , function(error, response, body) {
        expect(response.statusCode).to.equal(404);
        done();
    });
});

it('Response format', function(done) {
    this.timeout(10000);
    request('http://localhost:3000' , function(error, response, body) {
        const bodyObject = JSON.parse(body);

        expect(bodyObject).to.have.property('twitter');
        expect(bodyObject).to.have.property('facebook');
        expect(bodyObject).to.have.property('instagram');

        expect(bodyObject.twitter).to.be.an('array');
        expect(bodyObject.facebook).to.be.an('array');
        expect(bodyObject.instagram).to.be.an('array');

        done();
    });
});
