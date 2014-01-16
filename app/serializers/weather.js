export default DS.JSONSerializer.extend({

  extract: function(store, type, payload) {
    var weatherConditions = payload.weatherConditions.current_observation,
        weatherForecastDay = payload.weatherForecast.forecast.simpleforecast.forecastday,
        imageApi = payload.imageApi.photos,
        location = payload.location;

    // TODO: map
    var days = [];
    Ember.ArrayPolyfills.forEach.call(weatherForecastDay, function(day) {
      days.pushObject(day);
    });

    var weather = {
          tempC: weatherConditions.temp_c,
          tempF: weatherConditions.temp_f,
          iconUrl: weatherConditions.icon_url,
          temperatureString: weatherConditions.temperature_string,
        };

    var ret = {
      id: location.split(", ").join('-').toLowerCase(),
      weather: Ember.merge(weather, weatherConditions),
      days: days,
      image: imageApi[0],
      location: location,
      searchField: payload.searchField
    };


    window.console.log("from the serializer", ret);
    return ret;
  }


});

/*
image =====================
{
   "current_page":1,
   "total_pages":2844,
   "total_items":2844,
   "photos":[
      {
         "id":54543406,
         "name":"Untitled",
         "description":null,
         "times_viewed":4,
         "rating":66.3,
         "created_at":"2013-12-10T07:51:30-05:00",
         "category":8,
         "privacy":false,
         "width":4602,
         "height":2986,
         "votes_count":5,
         "favorites_count":3,
         "comments_count":0,
         "nsfw":false,
         "image_url":"http://ppcdn.500px.org/54543406/aedfc61af4e3ac7c62a6ce08ebf694b6d7fae7ab/2.jpg",
         "images":[
            {
               "size":2,
               "url":"http://ppcdn.500px.org/54543406/aedfc61af4e3ac7c62a6ce08ebf694b6d7fae7ab/2.jpg"
            }
         ],
         "user":{
            "id":3191513,
            "username":"earlcook",
            "firstname":"earl",
            "lastname":"cook",
            "city":"Auckland",
            "country":"New Zealand ",
            "fullname":"earl cook",
            "userpic_url":"http://pacdn.500px.org/3191513/424398211cbb01597ce1f82e49423a41e732db0b/1.jpg?2",
            "upgrade_status":0,
            "followers_count":0,
            "affection":17
         }
      }
   ]
}
forecast ========
{
   "response":{
      "version":"0.1",
      "termsofService":"http://www.wunderground.com/weather/api/d/terms.html",
      "features":{
         "forecast":1
      }
   },
   "forecast":{
      "txt_forecast":{
         "date":"1:00 PM PST",
         "forecastday":[
            {
               "period":0,
               "icon":"chancesleet",
               "icon_url":"http://icons-ak.wxug.com/i/c/k/chancesleet.gif",
               "title":"Tuesday",
               "fcttext":"Overcast with a ice pellets and snow showers in the morning, then mostly cloudy with snow showers and rain showers. High of 39F. Winds less than 5 mph. Chance of precipitation 50% .",
               "fcttext_metric":"Overcast with a chance of rain, then rain showers in the afternoon. High of 4C. Winds less than 5 km/h. Chance of rain 50%.",
               "pop":"50"
            },
            {
               "period":1,
               "icon":"mostlycloudy",
               "icon_url":"http://icons-ak.wxug.com/i/c/k/mostlycloudy.gif",
               "title":"Tuesday Night",
               "fcttext":"Mostly cloudy with snow showers. Low of 28F. Winds less than 5 mph.",
               "fcttext_metric":"Mostly cloudy with snow showers. Low of -2C. Winds less than 5 km/h.",
               "pop":"20"
            },
            {
               "period":2,
               "icon":"partlycloudy",
               "icon_url":"http://icons-ak.wxug.com/i/c/k/partlycloudy.gif",
               "title":"Wednesday",
               "fcttext":"Mostly cloudy. High of 41F. Winds less than 5 mph.",
               "fcttext_metric":"Mostly cloudy. High of 5C. Winds less than 5 km/h.",
               "pop":"10"
            },
            {
               "period":3,
               "icon":"chancesleet",
               "icon_url":"http://icons-ak.wxug.com/i/c/k/chancesleet.gif",
               "title":"Wednesday Night",
               "fcttext":"Mostly cloudy with ice pellets and a chance of snow after midnight. Fog overnight. Low of 28F. Winds less than 5 mph. Chance of precipitation 70% .",
               "fcttext_metric":"Mostly cloudy with ice pellets and a chance of rain after midnight. Fog overnight. Low of -2C. Winds less than 5 km/h. Chance of precipitation 70% .",
               "pop":"70"
            },
            {
               "period":4,
               "icon":"chancesleet",
               "icon_url":"http://icons-ak.wxug.com/i/c/k/chancesleet.gif",
               "title":"Thursday",
               "fcttext":"Mostly cloudy with ice pellets and rain in the morning, then overcast with ice pellets and rain. High of 43F. Breezy. Winds from the SSE at 15 to 20 mph. Chance of precipitation 80% .",
               "fcttext_metric":"Overcast with a chance of rain. High of 6C. Breezy. Winds from the SSE at 20 to 25 km/h. Chance of rain 80%.",
               "pop":"80"
            },
            {
               "period":5,
               "icon":"chancerain",
               "icon_url":"http://icons-ak.wxug.com/i/c/k/chancerain.gif",
               "title":"Thursday Night",
               "fcttext":"Overcast with a chance of rain. Low of 39F. Winds from the South at 5 to 10 mph. Chance of rain 50%.",
               "fcttext_metric":"Overcast with a chance of rain. Low of 4C. Winds from the South at 5 to 15 km/h. Chance of rain 50%.",
               "pop":"50"
            },
            {
               "period":6,
               "icon":"mostlycloudy",
               "icon_url":"http://icons-ak.wxug.com/i/c/k/mostlycloudy.gif",
               "title":"Friday",
               "fcttext":"Overcast with a chance of rain. Fog early. High of 45F. Winds less than 5 mph. Chance of rain 20%.",
               "fcttext_metric":"Overcast with a chance of rain. Fog early. High of 7C. Winds less than 5 km/h.",
               "pop":"20"
            },
            {
               "period":7,
               "icon":"cloudy",
               "icon_url":"http://icons-ak.wxug.com/i/c/k/cloudy.gif",
               "title":"Friday Night",
               "fcttext":"Overcast. Low of 34F. Winds less than 5 mph.",
               "fcttext_metric":"Overcast. Low of 1C. Winds less than 5 km/h.",
               "pop":"0"
            }
         ]
      },
      "simpleforecast":{
         "forecastday":[
            {
               "date":{
                  "epoch":"1386741600",
                  "pretty":"10:00 PM PST on December 10, 2013",
                  "day":10,
                  "month":12,
                  "year":2013,
                  "yday":343,
                  "hour":22,
                  "min":"00",
                  "sec":0,
                  "isdst":"0",
                  "monthname":"December",
                  "monthname_short":"Dec",
                  "weekday_short":"Tue",
                  "weekday":"Tuesday",
                  "ampm":"PM",
                  "tz_short":"PST",
                  "tz_long":"America/Los_Angeles"
               },
               "period":1,
               "high":{
                  "fahrenheit":"39",
                  "celsius":"4"
               },
               "low":{
                  "fahrenheit":"28",
                  "celsius":"-2"
               },
               "conditions":"Ice Pellets",
               "icon":"chancesleet",
               "icon_url":"http://icons-ak.wxug.com/i/c/k/chancesleet.gif",
               "skyicon":"mostlycloudy",
               "pop":50,
               "qpf_allday":{
                  "in":0.03,
                  "mm":0.8
               },
               "qpf_day":{
                  "in":0.01,
                  "mm":0.3
               },
               "qpf_night":{
                  "in":0.00,
                  "mm":0.0
               },
               "snow_allday":{
                  "in":1,
                  "cm":2
               },
               "snow_day":{
                  "in":0,
                  "cm":1
               },
               "snow_night":{
                  "in":0,
                  "cm":0
               },
               "maxwind":{
                  "mph":4,
                  "kph":6,
                  "dir":"SW",
                  "degrees":229
               },
               "avewind":{
                  "mph":2,
                  "kph":3,
                  "dir":"ESE",
                  "degrees":116
               },
               "avehumidity":83,
               "maxhumidity":92,
               "minhumidity":63
            },
            {
               "date":{
                  "epoch":"1386828000",
                  "pretty":"10:00 PM PST on December 11, 2013",
                  "day":11,
                  "month":12,
                  "year":2013,
                  "yday":344,
                  "hour":22,
                  "min":"00",
                  "sec":0,
                  "isdst":"0",
                  "monthname":"December",
                  "monthname_short":"Dec",
                  "weekday_short":"Wed",
                  "weekday":"Wednesday",
                  "ampm":"PM",
                  "tz_short":"PST",
                  "tz_long":"America/Los_Angeles"
               },
               "period":2,
               "high":{
                  "fahrenheit":"41",
                  "celsius":"5"
               },
               "low":{
                  "fahrenheit":"28",
                  "celsius":"-2"
               },
               "conditions":"Partly Cloudy",
               "icon":"partlycloudy",
               "icon_url":"http://icons-ak.wxug.com/i/c/k/partlycloudy.gif",
               "skyicon":"partlycloudy",
               "pop":10,
               "qpf_allday":{
                  "in":0.00,
                  "mm":0.0
               },
               "qpf_day":{
                  "in":0.00,
                  "mm":0.0
               },
               "qpf_night":{
                  "in":0.00,
                  "mm":0.0
               },
               "snow_allday":{
                  "in":0,
                  "cm":0
               },
               "snow_day":{
                  "in":0,
                  "cm":0
               },
               "snow_night":{
                  "in":0,
                  "cm":0
               },
               "maxwind":{
                  "mph":3,
                  "kph":5,
                  "dir":"NE",
                  "degrees":52
               },
               "avewind":{
                  "mph":3,
                  "kph":5,
                  "dir":"ENE",
                  "degrees":68
               },
               "avehumidity":83,
               "maxhumidity":92,
               "minhumidity":62
            },
            {
               "date":{
                  "epoch":"1386914400",
                  "pretty":"10:00 PM PST on December 12, 2013",
                  "day":12,
                  "month":12,
                  "year":2013,
                  "yday":345,
                  "hour":22,
                  "min":"00",
                  "sec":0,
                  "isdst":"0",
                  "monthname":"December",
                  "monthname_short":"Dec",
                  "weekday_short":"Thu",
                  "weekday":"Thursday",
                  "ampm":"PM",
                  "tz_short":"PST",
                  "tz_long":"America/Los_Angeles"
               },
               "period":3,
               "high":{
                  "fahrenheit":"43",
                  "celsius":"6"
               },
               "low":{
                  "fahrenheit":"39",
                  "celsius":"4"
               },
               "conditions":"Ice Pellets",
               "icon":"chancesleet",
               "icon_url":"http://icons-ak.wxug.com/i/c/k/chancesleet.gif",
               "skyicon":"cloudy",
               "pop":80,
               "qpf_allday":{
                  "in":0.30,
                  "mm":7.6
               },
               "qpf_day":{
                  "in":0.18,
                  "mm":4.6
               },
               "qpf_night":{
                  "in":0.15,
                  "mm":3.8
               },
               "snow_allday":{
                  "in":0,
                  "cm":0
               },
               "snow_day":{
                  "in":0,
                  "cm":0
               },
               "snow_night":{
                  "in":0,
                  "cm":0
               },
               "maxwind":{
                  "mph":15,
                  "kph":24,
                  "dir":"South",
                  "degrees":189
               },
               "avewind":{
                  "mph":9,
                  "kph":14,
                  "dir":"South",
                  "degrees":169
               },
               "avehumidity":80,
               "maxhumidity":87,
               "minhumidity":67
            },
            {
               "date":{
                  "epoch":"1387000800",
                  "pretty":"10:00 PM PST on December 13, 2013",
                  "day":13,
                  "month":12,
                  "year":2013,
                  "yday":346,
                  "hour":22,
                  "min":"00",
                  "sec":0,
                  "isdst":"0",
                  "monthname":"December",
                  "monthname_short":"Dec",
                  "weekday_short":"Fri",
                  "weekday":"Friday",
                  "ampm":"PM",
                  "tz_short":"PST",
                  "tz_long":"America/Los_Angeles"
               },
               "period":4,
               "high":{
                  "fahrenheit":"45",
                  "celsius":"7"
               },
               "low":{
                  "fahrenheit":"34",
                  "celsius":"1"
               },
               "conditions":"Chance of Rain",
               "icon":"mostlycloudy",
               "icon_url":"http://icons-ak.wxug.com/i/c/k/mostlycloudy.gif",
               "skyicon":"mostlycloudy",
               "pop":20,
               "qpf_allday":{
                  "in":0.05,
                  "mm":1.3
               },
               "qpf_day":{
                  "in":0.02,
                  "mm":0.5
               },
               "qpf_night":{
                  "in":0.00,
                  "mm":0.0
               },
               "snow_allday":{
                  "in":0,
                  "cm":0
               },
               "snow_day":{
                  "in":0,
                  "cm":0
               },
               "snow_night":{
                  "in":0,
                  "cm":0
               },
               "maxwind":{
                  "mph":4,
                  "kph":6,
                  "dir":"South",
                  "degrees":186
               },
               "avewind":{
                  "mph":3,
                  "kph":5,
                  "dir":"South",
                  "degrees":176
               },
               "avehumidity":90,
               "maxhumidity":100,
               "minhumidity":87
            }
         ]
      }
   }
}

Current =====
{
  {
  "response": {
  "version":"0.1",
  "termsofService":"http://www.wunderground.com/weather/api/d/terms.html",
  "features": {
  "conditions": 1
  }
  }
  , "current_observation": {
    "image": {
    "url":"http://icons-ak.wxug.com/graphics/wu2/logo_130x80.png",
    "title":"Weather Underground",
    "link":"http://www.wunderground.com"
    },
    "display_location": {
    "full":"Portland, AR",
    "city":"Portland",
    "state":"AR",
    "state_name":"Arkansas",
    "country":"US",
    "country_iso3166":"US",
    "zip":"71663",
    "magic":"1",
    "wmo":"99999",
    "latitude":"33.23935318",
    "longitude":"-91.51620483",
    "elevation":"45.00000000"
    },
    "observation_location": {
    "full":"Monticello, Arkansas",
    "city":"Monticello",
    "state":"Arkansas",
    "country":"US",
    "country_iso3166":"US",
    "latitude":"33.63605118",
    "longitude":"-91.75548553",
    "elevation":"269 ft"
    },
    "estimated": {
    },
    "station_id":"KLLQ",
    "observation_time":"Last Updated on December 10, 12:53 AM CST",
    "observation_time_rfc822":"Tue, 10 Dec 2013 00:53:00 -0600",
    "observation_epoch":"1386658380",
    "local_time_rfc822":"Tue, 10 Dec 2013 01:25:25 -0600",
    "local_epoch":"1386660325",
    "local_tz_short":"CST",
    "local_tz_long":"America/Chicago",
    "local_tz_offset":"-0600",
    "weather":"Overcast",
    "temperature_string":"32 F (0 C)",
    "temp_f":32,
    "temp_c":0,
    "relative_humidity":"88%",
    "wind_string":"From the NNW at 6 MPH",
    "wind_dir":"NNW",
    "wind_degrees":330,
    "wind_mph":6,
    "wind_gust_mph":0,
    "wind_kph":9,
    "wind_gust_kph":0,
    "pressure_mb":"1026",
    "pressure_in":"30.30",
    "pressure_trend":"+",
    "dewpoint_string":"29 F (-2 C)",
    "dewpoint_f":29,
    "dewpoint_c":-2,
    "heat_index_string":"NA",
    "heat_index_f":"NA",
    "heat_index_c":"NA",
    "windchill_string":"26 F (-3 C)",
    "windchill_f":"26",
    "windchill_c":"-3",
    "feelslike_string":"26 F (-3 C)",
    "feelslike_f":"26",
    "feelslike_c":"-3",
    "visibility_mi":"8.0",
    "visibility_km":"12.9",
    "solarradiation":"--",
    "UV":"0","precip_1hr_string":"-9999.00 in (-9999.00 mm)",
    "precip_1hr_in":"-9999.00",
    "precip_1hr_metric":"--",
    "precip_today_string":"0.00 in (0.0 mm)",
    "precip_today_in":"0.00",
    "precip_today_metric":"0.0",
    "icon":"cloudy",
    "icon_url":"http://icons-ak.wxug.com/i/c/k/nt_cloudy.gif",
    "forecast_url":"http://www.wunderground.com/US/AR/Portland.html",
    "history_url":"http://www.wunderground.com/history/airport/KLLQ/2013/12/10/DailyHistory.html",
    "ob_url":"http://www.wunderground.com/cgi-bin/findweather/getForecast?query=33.63605118,-91.75548553"
  }
}
*/
