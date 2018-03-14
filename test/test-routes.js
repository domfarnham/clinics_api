const expect = require('chai').expect
const request = require('supertest')

describe('routes', function () {
  let server
  beforeEach(function () {
    server = require('../server')
  })
  afterEach(function () {
    server.close()
  })
  it('should respond to /clinics/postcode/:postcode', function testPostCode (done) {
    request(server)
      .get('/clinics/postcode/SW11 4LU')
      .expect(200, done)
  })
  it('should respond to /clinics/city/:name', function testPostCode (done) {
    request(server)
      .get('/clinics/city/Croydon')
      .expect(200, done)
  })
  it('should respond with 404 for everything else', function testPath (done) {
    request(server)
      .get('/foo/bar')
      .expect(404, done)
  })
})
