var App,
    weatherUrl = 'http://localhost:8000/weather/vancouver-canada';

module('Acceptances - Weather', {
  setup: function(){
    App = startApp();
    // ic.ajax.defineFixture(weatherUrl, {
    //     response: weather,
    //     jqXHR: {},
    //     textStatus: 'success'
    // });

  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

test('locations/weather renders', function(){
  expect(1);
  visit('/').then(function(){

    visit('/locations/vancouver-canada').then(function(){
      var title = find('.weather-panel h1');

      equal(title.text(), 'Vancouver, Canada');
    });
  });
});


var weather = {
    "id": "vancouver-canada",
    "name": "Vancouver, Canada",
    "forecast": [
        {
            "date": {
                "epoch": "1392098400",
                "pretty": "10:00 PM PST on February 10, 2014",
                "day": 10,
                "month": 2,
                "year": 2014,
                "yday": 40,
                "hour": 22,
                "min": "00",
                "sec": 0,
                "isdst": "0",
                "monthname": "February",
                "monthname_short": "Feb",
                "weekday_short": "Mon",
                "weekday": "Monday",
                "ampm": "PM",
                "tz_short": "PST",
                "tz_long": "America/Vancouver"
            },
            "period": 1,
            "high": {
                "fahrenheit": "43",
                "celsius": "6"
            },
            "low": {
                "fahrenheit": "37",
                "celsius": "3"
            },
            "conditions": "Snow",
            "icon": "snow",
            "icon_url": "http://icons-ak.wxug.com/i/c/k/snow.gif",
            "skyicon": "cloudy",
            "pop": 90,
            "qpf_allday": {
                "in": 0.63,
                "mm": 16
            },
            "qpf_day": {
                "in": 0.36,
                "mm": 9.1
            },
            "qpf_night": {
                "in": 0.11,
                "mm": 2.8
            },
            "snow_allday": {
                "in": 1,
                "cm": 1
            },
            "snow_day": {
                "in": 0,
                "cm": 0
            },
            "snow_night": {
                "in": 0,
                "cm": 0
            },
            "maxwind": {
                "mph": 12,
                "kph": 19,
                "dir": "SE",
                "degrees": 141
            },
            "avewind": {
                "mph": 10,
                "kph": 16,
                "dir": "SSE",
                "degrees": 164
            },
            "avehumidity": 93,
            "maxhumidity": 96,
            "minhumidity": 69
        },
        {
            "date": {
                "epoch": "1392184800",
                "pretty": "10:00 PM PST on February 11, 2014",
                "day": 11,
                "month": 2,
                "year": 2014,
                "yday": 41,
                "hour": 22,
                "min": "00",
                "sec": 0,
                "isdst": "0",
                "monthname": "February",
                "monthname_short": "Feb",
                "weekday_short": "Tue",
                "weekday": "Tuesday",
                "ampm": "PM",
                "tz_short": "PST",
                "tz_long": "America/Vancouver"
            },
            "period": 2,
            "high": {
                "fahrenheit": "41",
                "celsius": "5"
            },
            "low": {
                "fahrenheit": "37",
                "celsius": "3"
            },
            "conditions": "Chance of Rain",
            "icon": "chancerain",
            "icon_url": "http://icons-ak.wxug.com/i/c/k/chancerain.gif",
            "skyicon": "mostlycloudy",
            "pop": 40,
            "qpf_allday": {
                "in": 0.59,
                "mm": 15
            },
            "qpf_day": {
                "in": 0.01,
                "mm": 0.3
            },
            "qpf_night": {
                "in": 0.94,
                "mm": 23.9
            },
            "snow_allday": {
                "in": 0,
                "cm": 0
            },
            "snow_day": {
                "in": 0,
                "cm": 0
            },
            "snow_night": {
                "in": 0,
                "cm": 0
            },
            "maxwind": {
                "mph": 10,
                "kph": 16,
                "dir": "East",
                "degrees": 83
            },
            "avewind": {
                "mph": 8,
                "kph": 13,
                "dir": "ESE",
                "degrees": 104
            },
            "avehumidity": 90,
            "maxhumidity": 93,
            "minhumidity": 89
        },
        {
            "date": {
                "epoch": "1392271200",
                "pretty": "10:00 PM PST on February 12, 2014",
                "day": 12,
                "month": 2,
                "year": 2014,
                "yday": 42,
                "hour": 22,
                "min": "00",
                "sec": 0,
                "isdst": "0",
                "monthname": "February",
                "monthname_short": "Feb",
                "weekday_short": "Wed",
                "weekday": "Wednesday",
                "ampm": "PM",
                "tz_short": "PST",
                "tz_long": "America/Vancouver"
            },
            "period": 3,
            "high": {
                "fahrenheit": "43",
                "celsius": "6"
            },
            "low": {
                "fahrenheit": "39",
                "celsius": "4"
            },
            "conditions": "Chance of Rain",
            "icon": "chancerain",
            "icon_url": "http://icons-ak.wxug.com/i/c/k/chancerain.gif",
            "skyicon": "mostlycloudy",
            "pop": 60,
            "qpf_allday": {
                "in": 0.61,
                "mm": 15.5
            },
            "qpf_day": {
                "in": 0.22,
                "mm": 5.6
            },
            "qpf_night": {
                "in": 0.21,
                "mm": 5.3
            },
            "snow_allday": {
                "in": 0,
                "cm": 0
            },
            "snow_day": {
                "in": 0,
                "cm": 0
            },
            "snow_night": {
                "in": 0,
                "cm": 0
            },
            "maxwind": {
                "mph": 13,
                "kph": 21,
                "dir": "SW",
                "degrees": 224
            },
            "avewind": {
                "mph": 11,
                "kph": 18,
                "dir": "SSW",
                "degrees": 203
            },
            "avehumidity": 89,
            "maxhumidity": 97,
            "minhumidity": 87
        },
        {
            "date": {
                "epoch": "1392357600",
                "pretty": "10:00 PM PST on February 13, 2014",
                "day": 13,
                "month": 2,
                "year": 2014,
                "yday": 43,
                "hour": 22,
                "min": "00",
                "sec": 0,
                "isdst": "0",
                "monthname": "February",
                "monthname_short": "Feb",
                "weekday_short": "Thu",
                "weekday": "Thursday",
                "ampm": "PM",
                "tz_short": "PST",
                "tz_long": "America/Vancouver"
            },
            "period": 4,
            "high": {
                "fahrenheit": "43",
                "celsius": "6"
            },
            "low": {
                "fahrenheit": "39",
                "celsius": "4"
            },
            "conditions": "Chance of Rain",
            "icon": "chancerain",
            "icon_url": "http://icons-ak.wxug.com/i/c/k/chancerain.gif",
            "skyicon": "mostlycloudy",
            "pop": 50,
            "qpf_allday": {
                "in": 0.49,
                "mm": 12.4
            },
            "qpf_day": {
                "in": 0.09,
                "mm": 2.3
            },
            "qpf_night": {
                "in": 0.58,
                "mm": 14.7
            },
            "snow_allday": {
                "in": 0,
                "cm": 0
            },
            "snow_day": {
                "in": 0,
                "cm": 0
            },
            "snow_night": {
                "in": 0,
                "cm": 0
            },
            "maxwind": {
                "mph": 9,
                "kph": 14,
                "dir": "SE",
                "degrees": 141
            },
            "avewind": {
                "mph": 7,
                "kph": 11,
                "dir": "SE",
                "degrees": 126
            },
            "avehumidity": 93,
            "maxhumidity": 95,
            "minhumidity": 89
        },
        {
            "date": {
                "epoch": "1392444000",
                "pretty": "10:00 PM PST on February 14, 2014",
                "day": 14,
                "month": 2,
                "year": 2014,
                "yday": 44,
                "hour": 22,
                "min": "00",
                "sec": 0,
                "isdst": "0",
                "monthname": "February",
                "monthname_short": "Feb",
                "weekday_short": "Fri",
                "weekday": "Friday",
                "ampm": "PM",
                "tz_short": "PST",
                "tz_long": "America/Vancouver"
            },
            "period": 5,
            "high": {
                "fahrenheit": "43",
                "celsius": "6"
            },
            "low": {
                "fahrenheit": "37",
                "celsius": "3"
            },
            "conditions": "Chance of Rain",
            "icon": "chancerain",
            "icon_url": "http://icons-ak.wxug.com/i/c/k/chancerain.gif",
            "skyicon": "partlycloudy",
            "pop": 50,
            "qpf_allday": {
                "in": 0.42,
                "mm": 10.7
            },
            "qpf_day": {
                "in": 0.05,
                "mm": 1.3
            },
            "qpf_night": {
                "in": 0,
                "mm": 0
            },
            "snow_allday": {
                "in": 0,
                "cm": 0
            },
            "snow_day": {
                "in": 0,
                "cm": 0
            },
            "snow_night": {
                "in": 0,
                "cm": 0
            },
            "maxwind": {
                "mph": 13,
                "kph": 21,
                "dir": "SW",
                "degrees": 217
            },
            "avewind": {
                "mph": 8,
                "kph": 13,
                "dir": "SSW",
                "degrees": 199
            },
            "avehumidity": 88,
            "maxhumidity": 94,
            "minhumidity": 87
        },
        {
            "date": {
                "epoch": "1392530400",
                "pretty": "10:00 PM PST on February 15, 2014",
                "day": 15,
                "month": 2,
                "year": 2014,
                "yday": 45,
                "hour": 22,
                "min": "00",
                "sec": 0,
                "isdst": "0",
                "monthname": "February",
                "monthname_short": "Feb",
                "weekday_short": "Sat",
                "weekday": "Saturday",
                "ampm": "PM",
                "tz_short": "PST",
                "tz_long": "America/Vancouver"
            },
            "period": 6,
            "high": {
                "fahrenheit": "41",
                "celsius": "5"
            },
            "low": {
                "fahrenheit": "39",
                "celsius": "4"
            },
            "conditions": "Mostly Cloudy",
            "icon": "mostlycloudy",
            "icon_url": "http://icons-ak.wxug.com/i/c/k/mostlycloudy.gif",
            "skyicon": "cloudy",
            "pop": 0,
            "qpf_allday": {
                "in": 0.5,
                "mm": 12.7
            },
            "qpf_day": {
                "in": 0,
                "mm": 0
            },
            "qpf_night": {
                "in": 0.63,
                "mm": 16
            },
            "snow_allday": {
                "in": 0,
                "cm": 0
            },
            "snow_day": {
                "in": 0,
                "cm": 0
            },
            "snow_night": {
                "in": 0,
                "cm": 0
            },
            "maxwind": {
                "mph": 10,
                "kph": 16,
                "dir": "East",
                "degrees": 100
            },
            "avewind": {
                "mph": 8,
                "kph": 13,
                "dir": "East",
                "degrees": 82
            },
            "avehumidity": 89,
            "maxhumidity": 93,
            "minhumidity": 81
        },
        {
            "date": {
                "epoch": "1392616800",
                "pretty": "10:00 PM PST on February 16, 2014",
                "day": 16,
                "month": 2,
                "year": 2014,
                "yday": 46,
                "hour": 22,
                "min": "00",
                "sec": 0,
                "isdst": "0",
                "monthname": "February",
                "monthname_short": "Feb",
                "weekday_short": "Sun",
                "weekday": "Sunday",
                "ampm": "PM",
                "tz_short": "PST",
                "tz_long": "America/Vancouver"
            },
            "period": 7,
            "high": {
                "fahrenheit": "41",
                "celsius": "5"
            },
            "low": {
                "fahrenheit": "41",
                "celsius": "5"
            },
            "conditions": "Chance of Rain",
            "icon": "chancerain",
            "icon_url": "http://icons-ak.wxug.com/i/c/k/chancerain.gif",
            "skyicon": "cloudy",
            "pop": 70,
            "qpf_allday": {
                "in": 0.93,
                "mm": 23.6
            },
            "qpf_day": {
                "in": 0.38,
                "mm": 9.7
            },
            "qpf_night": {
                "in": 0.9,
                "mm": 22.9
            },
            "snow_allday": {
                "in": 0,
                "cm": 0
            },
            "snow_day": {
                "in": 0,
                "cm": 0
            },
            "snow_night": {
                "in": 0,
                "cm": 0
            },
            "maxwind": {
                "mph": 20,
                "kph": 32,
                "dir": "SSE",
                "degrees": 156
            },
            "avewind": {
                "mph": 17,
                "kph": 27,
                "dir": "SSE",
                "degrees": 163
            },
            "avehumidity": 89,
            "maxhumidity": 93,
            "minhumidity": 76
        }
    ],
    "imageUrl": "http://ppcdn.500px.org/58892656/98fad462f731b6d2bd2f7e11619d8f74412cd373/5.jpg",
    "photographer": {
        "id": 4462754,
        "username": "peteleclerc",
        "firstname": "Pierre",
        "lastname": "Leclerc",
        "city": "Vancouver",
        "country": "Canada",
        "fullname": "Pierre Leclerc",
        "userpic_url": "http://pacdn.500px.org/4462754/69e6bd3bbc0a5319a95c688048917b3f910adbfb/1.jpg?1",
        "upgrade_status": 0,
        "followers_count": 197,
        "affection": 4640
    },
    "tempF": 43,
    "tempC": 6,
    "icon": "cloudy",
    "windGustMph": 0,
    "windDegrees": 190,
    "localEpoch": "1392100775"
};
