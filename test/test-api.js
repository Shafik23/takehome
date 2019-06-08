const expect  = require('chai').expect;
const request = require('request');

it('Status', function(done) {
    this.timeout(10000);
    request('http://localhost:3000' , function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
    });
});
