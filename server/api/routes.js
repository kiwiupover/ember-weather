var request = require('request')
  , RSVP = require('rsvp')
  , get = RSVP.denodeify(request.get)
  , apiKeys = require('./api-keys')
  , Lazy = require('lazy.js')
  , logger = require('./logger')().logger
  , fixture = {}

fixture.seattle = require('../fixtures/seattle')
fixture.auckland = require('../fixtures/auckland')
fixture.vancouver = require('../fixtures/vancouver')
fixture.search = require('../fixtures/search')

function getSearch(query, opts) {
  var dasherizedQuery = query.split('-').join(', ').split('_').join(' ')
    , wundergroundQueryUrl = 'http://autocomplete.wunderground.com/aq?query=' + dasherizedQuery
    , limit = (opts && opts.limit) || 1

  return timedGet(wundergroundQueryUrl).then(function(response) {
    var results = JSON.parse(response[1]).RESULTS
    return Lazy(results).filter({'type': 'city'}).take(limit).toArray()
  })
}

function fetchPayload(searchResults) {
  var result = searchResults[0]
    , latLon = result.ll.split(' ')
    , latField = latLon[0]
    , lonField = latLon[1]
    , nameField = result.name

  return RSVP.hash({
    weatherConditions: asJSON(timedGet(buildWeatherUrl('conditions', latField, lonField))),
    weatherForecast: asJSON(timedGet(buildWeatherUrl('forecast10day', latField, lonField))),
    imageApi: asJSON(timedGet(build500pxUrl(nameField))),
    locationName: nameField
  })

  function buildWeatherUrl (type, latField, lonField) {
    return 'https://api.forecast.io/forecast/' + apiKeys.forecast + '/' +
        latField + ',' + lonField
  }

  function build500pxUrl (nameField) {
    var rand = Math.floor((Math.random()*5)+1)
    return 'https://api.500px.com/v1/photos/search?term=' +
           nameField +
           '&only=landscapes&sort=favorites_count&rpp=1&page='+rand+'&consumer_key=' +
           apiKeys.fiveHundredPX
  }

  function asJSON (responsePromise) {
    return responsePromise.then(function (response) {
      return JSON.parse(response[0].body)
    })
  }
}

function timedGet(url) {
  var beforeGetTS = Date.now()
  return get(url).then(function (r) {
    logger.info("Request to " + url + " took " + (Date.now() - beforeGetTS) + " ms ")
    return r
  })
}

function handleError(e) {
  logger.info("there was an error", e)
}

module.exports = function(app) {
  app.get('/api/weather/:location', function (req, res) {
    logger.info("Request params " + req.params.location);

    if (!apiKeys.fiveHundredPX && !apiKeys.forecast || apiKeys.fixture)
      res.send(fixture[req.params.location]);
    else
      getSearch(req.params.location)
      .then(fetchPayload)
      .then(res.send.bind(res))
      .catch(handleError)
  })

  app.get('/api/search/:term', function (req, res) {

    if (!apiKeys.fiveHundredPX && !apiKeys.forecast || apiKeys.fixture)
      res.send(fixture.search)
    else
      getSearch(req.params.term, {limit: 5})
      .then(res.send.bind(res))
      .catch(handleError)
  })

}
