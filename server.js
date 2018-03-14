'use strict'

const express = require('express')
const app = express()
const clinics = require('./lib/clinics')

// Routes
app.use('/public', express.static(process.cwd() + '/public'))

app.get('/clinics/postcode/:postcode', clinics.findWithPostCode)

app.get('/clinics/city/:name', clinics.findWithCityName)

// Respond not found to all the wrong routes
app.use(function (req, res, next) {
  res.status(404)
  res.type('txt').send('Not found')
})

// Error Middleware
app.use(function (err, req, res, next) {
  if (err) {
    res.status(err.status || 500)
      .type('txt')
      .send(err.message || 'SERVER ERROR')
  }
})

const server = app.listen(3000, function () {
  console.log('Node.js listening on port ' + 3000)
})

module.exports = server
