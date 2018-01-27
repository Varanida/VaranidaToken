const api = require("../../api");
const supertest = require("supertest")(api);

it('Api running & 404 Error', function(done) {
  supertest
    .get('/api/foo/bar')
    .expect(404)
    .expect('DOCUMENT NOT FOUND')
    .end(done);
});
