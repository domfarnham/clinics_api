const request = require('request')
const async = require('async')

exports.find = (req, res, next) => {
  const postCode = req.params.postcode
  let partialPostCode
  let data
  let responseObject = {
    "results" : []
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
      partialPostCode = postCode.slice(0, 3)
      callback()
    },
    // Request clinics data
    callback => {
      request(`https://jsonplaceholder.typicode.com/posts`, (err, res, body) => {
        data = JSON.parse(body)
        callback()
      })
    },
    callback => {
      // Format Clinic Data
      data.result.forEach(clinic => {
        let obj = {}
        obj."organisation_id" = clinic.organisation_id
        obj.name = clinic.name
        responseObject.push(obj)
        callback()
      });
    }
  ], err => {
    if (err) return next(err)
    res.send(JSON.stringify(responseObject))
  })
}
