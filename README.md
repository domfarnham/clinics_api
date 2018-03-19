Clincs API
======
An example of a Node.js Microservice which provides an endpoint for searching for clinics by postcode.

It also provides an endpoint which responds with a list of partial postcodes within the city and the number of clinics within the postcode.

The app is hosted on Heroku.

# Endpoints

## /clinics/postcode/:postcode

This endpoint accepts a UK postcode, such as CR9 1PJ.

Here is an example URL that calls the API endpoint:

https://clinics-api.herokuapp.com/clinics/postcode/cr91pj

It provides a JSON response with results that match the full postcode only:

```js
{
   "results" : [
      {
         "organisation_id" : "58961",
         "name" : "Edridge Road Community Health Centre"
      },
      {
         "organisation_id" : "77668",
         "name" : "Edridge Road Walk-In Centre"
      }
   ]
}
```

## /clinics/city/:name

The second endpoint accepts the name of a city such as Croydon.

Here is an example URL that calls the API endpoint:

https://clinics-api.herokuapp.com/clinics/city/croydon

It provides a JSON response with a results object that contains all of the partial postcodes found and how many of them where found.

```js
{
   "results" : {
      "CR9" : 2,
      "CR0" : 8
   }
}
```
GitBook https://domfarnham.gitbooks.io/clinics-api/content

<img src="https://cdn.rawgit.com/standard/standard/master/badge.svg?1503150814326" alt="JSStandard Badge" height="56" width="171">
