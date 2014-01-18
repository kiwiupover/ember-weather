var request = require('request')
  , RSVP = require('rsvp')
  , get = RSVP.denodeify(request.get)
  , apiKeys = require('./api-keys')
  , Lazy = require('lazy.js')

function getSearch(query, opts) {
  var query = query.split('-').join(', ')
    , wundergroundQueryUrl = 'http://autocomplete.wunderground.com/aq?query=' + query
    , limit = (opts && opts.limit) || 1

  return get(wundergroundQueryUrl).then(function(response) {
    var results = JSON.parse(response[1]).RESULTS
    return Lazy(results).filter({'type': 'city'}).take(limit).toArray()
  })
}

function fetchPayload(searchResults) {
  var result = searchResults[0]
    , lField = result.l
    , nameField = result.name

  return RSVP.hash({
    weatherConditions: asJSON(get(buildWeatherUrl('conditions', lField))),
    weatherForecast: asJSON(get(buildWeatherUrl('forecast10day', lField))),
    imageApi: asJSON(get(build500pxUrl(nameField))),
    location: nameField,
    lField: lField
  })

  function buildWeatherUrl (type, lField) {
    return 'http://api.wunderground.com/api/' +
            apiKeys.wunderground + '/' + type +
            lField + '.json'
  }

  function build500pxUrl (nameField) {
    return 'https://api.500px.com/v1/photos/search?term=' +
           nameField +
           '&only=landscapes&sort=favorites_count&rpp=1&consumer_key=' +
           apiKeys.fiveHundredPX
  }

  function asJSON (responsePromise) {
    return responsePromise.then(function (response) {
      return JSON.parse(response[0].body)
    })
  }
}

function handleError(e) {
  console.log("there was an error", e)
}

module.exports = function(app) {
  app.get('/api/weather/:location', function (req, res) {
    getSearch(req.params.location)
    .then(fetchPayload)
    .then(res.send.bind(res))
    .catch(handleError)
  })

  app.get('/api/search/:term', function (req, res) {
    getSearch(req.params.term, {limit: 5})
    .then(res.send.bind(res))
    .catch(handleError)
  })

}