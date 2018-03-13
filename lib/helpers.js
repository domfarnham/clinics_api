'use strict'

const https = require('https')

/*exports.checkIsString = function (string) {
  if (typeof string === 'string') {
    return string
  } else {
    throw
  }
}*/

exports.appendParam = function (api, param) {
  return api += param
}

exports.submitRequest = function (api) {

}

exports.receiveJSON = function (res) {
  let json
  res.setEncoding("utf8")
  res.on("data", function(chunk) {
    json += chunk;
  })
  res.on("end", function() {
    console.log(json)
    return JSON.parse(json)
  })
}

exports.createOptions = function (endpoint) {
  return {
    host: "example-data.glitch.me",
    port: 443,
    path: endpoint,
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  }
}

exports.requestJSON = function (endpoint, callback) {
  const req = https.request(createOptions(endpoint), function () {
    let json
    res.setEncoding("utf8")
    res.on("data", function(chunk) {
      json += chunk;
    })
    res.on("end", function() {
      json = JSON.parse(json)
      callback(json)
    })
  })
 
  req.on("error", function(err) {
    res.send("error: " + err.message)
  });

  req.end()
};

