const request = require('request')
const async = require('async')

exports.findWithPostCode = (req, res, next) => {
  const postCode = req.params.postcode
  let partialPostCode
  let data
  let responseObject = {
    'results': []
  }
  async.series([
    // Verify it's a post code
    callback => {
      const postCodeRegEx = new RegExp('[A-IK-PR-UWYZa-ik-pr-uwyz]?[A-H,K-Ya-h,k-y][0-9]?[0-9A-HJKMNP-Ya-hjkmnp-y]\\s*[0-9][ABD-HJLNP-UW-Zabd-hjlnp-uw-z][ABD-HJLNP-UW-Zabd-hjlnp-uw-z]')
      if (!postCodeRegEx.test(postCode)) {
        // If not, return error
        return callback(new Error('Not a valid Post Code'))
      } else {
        callback()
      }
    },
    // Make a partial post code
    callback => {
      partialPostCode = postCode.slice(0, 3).toUpperCase()
      callback()
    },
    // Request clinics data
    callback => {
      request(`https://my-json-server.typicode.com/domfarnham/clinics_api/result`, (err, res, body) => {
        data = JSON.parse(body)
        callback()
      })
    },
    callback => {
      // Format Clinic Data
      data.forEach(clinic => {
        if (partialPostCode != clinic['partial_postcode']) return
        let obj = {}
        obj['organisation_id'] = clinic['organisation_id']
        obj.name = clinic.name
        responseObject.results.push(obj)
      })
      callback()
    }
  ], err => {
    if (err) return next(err)
    if (responseObject.results.length < 1) {
      res.send('No clinics in the post code')
    } else {
      res.send(JSON.stringify(responseObject))
    }
  })
}

exports.findWithCityName = (req, res, next) => {
  const cityName = req.params.name
  let data
  let postCodeList = []
  let counts = {}
  let responseObject = {
    'results': {}
  }

  async.series([
    // Request clinics data
    callback => {
      request(`https://my-json-server.typicode.com/domfarnham/clinics_api/result`, (err, res, body) => {
        data = JSON.parse(body)
        callback()
      })
    },
    // Filter Clinic Data
    callback => {
      data.forEach(clinic => {
        if (cityName.toUpperCase() != clinic['city'].toUpperCase()) return
        postCodeList.push(clinic['partial_postcode'])
      })
      callback()
    },
    // Create response object
    callback => {
      postCodeList.forEach(postCode => {
        counts[postCode] = (counts[postCode] || 0) + 1
      })
      callback()
    },
    callback => {
      responseObject.results = counts
      callback()
    }
  ],
  // Response
  err => {
    if (err) return next(err)
    if (responseObject.results.length < 1) {
      res.send('No clinics in the city')
    } else {
      res.send(JSON.stringify(responseObject))
    }
  })
}
