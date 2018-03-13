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
  it('should respond to /', function testSlash(done) {
  request(server)
    .get('/')
    .expect(200, done)
  })
  it('should respond to /clinics/postcode/:postcode', function testPostCode(done) {
    request(server)
      .get('/clinics/postcode/SW11 4LU')
      .expect(200, done)
  })
  it('should respond with 404 for incorrectly formatted post codes', function testBadPostCode
    (done) {
    request(server)
      .get('/clinics/postcode/SW114 4LU')
      .expect(404, done)
  })
  it('should respond with 404 for everything else', function testPath(done) {
    request(server)
      .get('/foo/bar')
      .expect(404, done)
  })
})
// describe('postCodeRoute', function() {
//   it('should accept a UK postcode, such as SW11 4LU', function() {

//   })
//   it('should call the getData function passing the first partial bit before the space as an argument')
//   it('should return the results JSON')
//   it('should not accept anything but a valid UK postcode')
// })

// describe('getData', function() {
//   it('should take a single argument of type string')
//   it('should submit a GET request to CLINICS_POSTCODE API using the argument string as the partial_postcode parameter')
//   it('should return the JSON received from the API')
// })

// describe('prepareResults', function() {
//   it('should receive JSON passed as an argument')
//   it('should copy the "organisation_id" and "name" key value pairs and push them to an array as an object')
//   it('should return JSON')
//   it('should return JSON which contains a results key with a value of type array')

// })

// describe('respond', function() {
  

// })

//   it('should return an object')
//   it('should return an object with a results key which has a value of type array')
//   it('should return an object with a results key which has a value of type array')
  
//   it('should list ALL blobs on /blobs GET', function(done) {
//   chai.request(server)
//     .get('/blobs')
//     .end(function(err, res){
//       res.should.have.status(200)
//       res.should.be.json
//       res.body.should.be.a('array')
//       done()
//     })
//   })
//   it('should list a SINGLE blob on /blob/<id> GET')
//   it('should add a SINGLE blob on /blobs POST')
//   it('should update a SINGLE blob on /blob/<id> PUT')
//   it('should delete a SINGLE blob on /blob/<id> DELETE')