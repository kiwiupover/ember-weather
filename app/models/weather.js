// Forecast implementation using Ember Data
// https://github.com/emberjs/data
// http://emberjs.com/guides/models

export default DS.Model.extend({
  location: DS.attr('string'),
  weather: DS.attr('string'),
  tempC: DS.attr('number'),
  tempF: DS.attr('number'),
  temperatureString: DS.attr('string'),
  icon: DS.attr('string'),
  iconUrl: DS.attr('string'),
  days: DS.attr('string'),
  image: DS.attr('string'),
  searchField: DS.attr(),

  imageLarge: function(){
    if (this.get('image.image_url')) {
      var img = this.get('image.image_url'),
        i = img.split('/');

      i[5] = '5.jpg';
      return i.join('/');
    } else {
      return '/assets/images/earth.jpg';
    }
  }.property('image.image_url'),

  displayDate: function(){
    var day = moment.unix(this.get('weather.local_epoch'));
    return day.format('MMM Do');
  }.property('weather.local_epoch'),

  eightDays: function(){
    return this.get('days').slice(0,7);
  }.property('days'),

  windDirection: function(){
    var windDegrees =  parseInt(this.get('weather.wind_degrees'), 10);

    if (windDegrees > this.getWindRange(windDegrees).min && windDegrees < this.getWindRange(windDegrees).max) return "N";
    if (windDegrees > this.getWindRange(windDegrees).min && windDegrees < this.getWindRange(windDegrees).max) return "E";

    // if (windDegrees > 16 && windDegrees < 60 ) return "NE";
    // if (windDegrees > 61 && windDegrees < 105) return "E";
    // if (windDegrees > 345 && windDegrees < 15) return "NE";
    // if (windDegrees > 345 && windDegrees < 15 ) return "S";
    // if (windDegrees > 345 && windDegrees < 15) return "SW";
    // if (windDegrees > 345 && windDegrees < 15) return "SE";
    // if (windDegrees > 345 && windDegrees < 15) return "W";
    // if (windDegrees > 345 && windDegrees < 15) return "E";

  }.property('weather.wind_degrees'),

  getWindRange: function(direction){
    var min  = parseInt(direction, 10) - 22.5,
        max  = parseInt(direction, 10) + 22.5;

    return {
      min: min,
      max: max
    };
  }


});


// "observation_time":"Last Updated on December 10, 12:53 AM CST",
//     "observation_time_rfc822":"Tue, 10 Dec 2013 00:53:00 -0600",
//     "observation_epoch":"1386658380",
//     "local_time_rfc822":"Tue, 10 Dec 2013 01:25:25 -0600",
//     "local_epoch":"1386660325",
//     "local_tz_short":"CST",
//     "local_tz_long":"America/Chicago",
//     "local_tz_offset":"-0600",
//     "weather":"Overcast",
//     "temperature_string":"32 F (0 C)",
//     "temp_f":32,
//     "temp_c":0,
//     "relative_humidity":"88%",
//     "wind_string":"From the NNW at 6 MPH",
//     "wind_dir":"NNW",
//     "wind_degrees":330,
//     "wind_mph":6,
//     "wind_gust_mph":0,
//     "wind_kph":9,
//     "wind_gust_kph":0,
//     "pressure_mb":"1026",
//     "pressure_in":"30.30",
//     "pressure_trend":"+",
//     "dewpoint_string":"29 F (-2 C)",
//     "dewpoint_f":29,
//     "dewpoint_c":-2,
//     "heat_index_string":"NA",
//     "heat_index_f":"NA",
//     "heat_index_c":"NA",
//     "windchill_string":"26 F (-3 C)",
//     "windchill_f":"26",
//     "windchill_c":"-3",
//     "feelslike_string":"26 F (-3 C)",
//     "feelslike_f":"26",
//     "feelslike_c":"-3",
//     "visibility_mi":"8.0",
//     "visibility_km":"12.9",
//     "solarradiation":"--",
//     "UV":"0","precip_1hr_string":"-9999.00 in (-9999.00 mm)",
//     "precip_1hr_in":"-9999.00",
//     "precip_1hr_metric":"--",
//     "precip_today_string":"0.00 in (0.0 mm)",
//     "precip_today_in":"0.00",
//     "precip_today_metric":"0.0",
//     "icon":"cloudy",
//     "icon_url":"http://icons-ak.wxug.com/i/c/k/nt_cloudy.gif",
//     "forecast_url":"http://www.wunderground.com/US/AR/Portland.html",
//     "history_url":"http://www.wunderground.com/history/airport/KLLQ/2013/12/10/DailyHistory.html",
//     "ob_url":"http://www.wunderground.com/cgi-bin/findweather/getForecast?query=33.63605118,-91.75548553"
