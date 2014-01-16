var request = require('request')
  , Promise = require('bluebird')

var get = Promise.promisify(request.get)

var apiKeys = {
  wunderground: process.env.WUNDERGROUND_KEY,
  fiveHundredPX: process.env.FIVEHUNDRED_PX_KEY
};

function buildWeatherUrl(type, lField) {
  return 'http://api.wunderground.com/api/' +
          apiKeys.wunderground + '/' +
          type +
          lField + '/' +
          '.json'
}

function build500pxUrl(nameField){
  var key = '&consumer_key=' + apiKeys.fiveHundredPX;

  return 'https://api.500px.com/v1/photos/search?term=' +
         nameField +
         '&only=landscapes&sort=favorites_count&rpp=1' +
         key;
}

function weatherUrls(response) {
  var body = JSON.parse(response[1])
    , lField = body.RESULTS[0].l
    , nameField = body.RESULTS[0].name;

  var ret = {
    conditions: buildWeatherUrl('conditions', lField),
    forecast: buildWeatherUrl('forecast10day', lField),
    image500pxAPI: build500pxUrl(nameField),
    location: nameField,
    searchField: lField
  }

  console.log("the ret is:", ret);
  return ret
}

function asJSON(responsePromise) {
  return responsePromise.then(function (response) {
    return JSON.parse(response[0].body)
  })
}

module.exports = function(app) {

  console.log('Api keys: ', apiKeys);

	app.get('/api/weather/:location', function (req, finalRes) {
    console.log('req is', req.params);
    var location = req.params.location
      , l = location.split('-').join(', ')
      , wundergroundQueryUrl = 'http://autocomplete.wunderground.com/aq?query=' + l

    console.log('req after is', l);
    console.log('wundergroundApiUrl is', wundergroundQueryUrl);

    get(wundergroundQueryUrl).then(function (response) {
      return weatherUrls(response);
    }).then(function (weatherUrls, response) {
      return Promise.props({
        weatherConditions: asJSON(get(weatherUrls.conditions)),
        weatherForecast: asJSON(get(weatherUrls.forecast)),
        imageApi: asJSON(get(weatherUrls.image500pxAPI)),
        location: weatherUrls.location,
        searchField: weatherUrls.searchField
      })
    }).then(function(result) {
      finalRes.send(result)
    }).catch(function (e) {
      console.log("there was an error", e)
    })

	});

  app.get('/api/search/:term', function(req, searchResults){
    var term = req.params.term
      , wundergroundQueryUrl = 'http://autocomplete.wunderground.com/aq?query=' + term;

    get(wundergroundQueryUrl).then(function(response) {
      searchResults.send(response);
    })

  });

};
