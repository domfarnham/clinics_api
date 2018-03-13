const request = require('request')
const async = require('async')

exports.find = (req, res) => {
  verifyIsAPostCode(req, res, answer => {
    res.send(answer)
  })
}

// verify that req.params is a post code
const verifyIsAPostCode = (req, res, next) => {
  const postCodeRegEx = new RegExp('[A-IK-PR-UWYZa-ik-pr-uwyz]?[A-H,K-Ya-h,k-y][0-9]?[0-9A-HJKMNP-Ya-hjkmnp-y]\\s*[0-9][ABD-HJLNP-UW-Zabd-hjlnp-uw-z][ABD-HJLNP-UW-Zabd-hjlnp-uw-z]')
  if (postCodeRegEx.test(req.params.postcode)) {
    let partial = partialPostCode(req.params.postcode)
    let clinics = getClinics(partial, data => next(JSON.stringify(data)))
  } else {
    // If not, return error
    res.send('Error: Not a valid Post Code')
  }
}
  
// Take the first partial bit before the space
const partialPostCode = postCode => postCode.slice(0, 3)
// Call CLINICS_POSTCODE
const getClinics = (partialPostCode, cb) => {
  request(`https://jsonplaceholder.typicode.com/posts`, (err, res, body) => {
    cb(JSON.parse(body))
  })
}
// Parse data
const clinicsList = data.result
// Create Object
const clinicsObject = {}
clinicsObject.results = clinicsList.map((clinic) => {
  let formattedClinic = {}
  formattedClinic['organisation_id'] = clinic['organisation_id'] 
  return formattedClinic
})
// Serialize object into JSON
JSON.stringify(clinicsObject)
// Return JSON