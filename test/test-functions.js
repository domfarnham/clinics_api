const expect = require('chai').expect
const request = require('supertest')
const requestJSON = require('../lib/helpers.js').requestJSON
const receiveJSON = require('../lib/helpers.js').receiveJSON
const appendParam = require('../lib/helpers.js').appendParam

describe('postCodeHandler', function () {
  it('should accept request and response objects as arguments from express')
  it('should call the getData function passing the first partial bit before the space as an argument')
  it('should return the results JSON')
})


/*describe('checkIsString', function () {
  it('should return a string if a string is passed as an argument', function () {
    expect(checkIsString('Testing123')).to.be.a('string')
  })
  it('should throw and exception if a number is passed as an argument', function () {
    expect(checkIsString(123)).to.throw
  })
})*/

describe('appendParam', function () {
  it('should append the parameter argument to the api argument', function () {
    expect(appendParam('https://data.gov.uk/data/api/service/health/clinics/partial_postcode?partial_postcode=', 'DA15'))
      .to.equal('https://data.gov.uk/data/api/service/health/clinics/partial_postcode?partial_postcode=DA15')
  })  
})

describe('requestJSON', function () {
  it('should submit a GET request to the URL passed as an argument', function () {
    expect(requestJSON('data/api/service/health/clinics/partial_postcode?partial_postcode=DA15', receiveJSON)).to.be.a('object')
  })
  it('should return the JSON received from the API')
})

describe('prepareResults', function () {
  it('should receive JSON passed as an argument')
  it('should copy the "organisation_id" and "name" key value pairs and push them to an array as an object')
  it('should return JSON')
  it('should return JSON which contains a results key with a value of type array')

})

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