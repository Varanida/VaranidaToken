const api = require('../../api');
const async = require('async');
const should = require('should');
const keythereum = require('keythereum');
const supertest = require('supertest')(api);

function mint(address, callback) {
  supertest
  .post('/api/'+address+'/mint/100000000')
  .expect(200)
  .expect('Content-Type', /json/)
  .end(function(err, res){
    res.body.should.have.property('success').which.is.a.Boolean();
    res.body.success.should.be.eql(true);
    callback(null, address);
  });
}

function getBalance(address, callback) {
  supertest
  .get('/api/'+address+'/balance')
  .expect(200)
  .expect('Content-Type', /json/)
  .end(function(err, res){
    res.body.should.be.eql('100000000');
    callback(null);
  });
}

it('Should create account and mint some tokens', function(done) {
  const k = keythereum.create();
  const privKey = (k.privateKey).toString('hex');
  const address = keythereum.privateKeyToAddress(privKey);
  async.waterfall([
    async.constant(address),
    mint,
    getBalance,
  ], function (err, res) {
    done(err);
  });
});
