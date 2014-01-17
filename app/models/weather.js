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

  // windDirection: function(){
  //   var windDegrees =  parseInt(this.get('weather.wind_degrees'), 10);

  //   if (windDegrees > this.getWindRange(windDegrees).min && windDegrees < this.getWindRange(windDegrees).max) return "N";
  //   if (windDegrees > this.getWindRange(windDegrees).min && windDegrees < this.getWindRange(windDegrees).max) return "E";

  //   if (windDegrees > 16 && windDegrees < 60 ) return "NE";
  //   if (windDegrees > 61 && windDegrees < 105) return "E";
  //   if (windDegrees > 345 && windDegrees < 15) return "NE";
  //   if (windDegrees > 345 && windDegrees < 15 ) return "S";
  //   if (windDegrees > 345 && windDegrees < 15) return "SW";
  //   if (windDegrees > 345 && windDegrees < 15) return "SE";
  //   if (windDegrees > 345 && windDegrees < 15) return "W";
  //   if (windDegrees > 345 && windDegrees < 15) return "E";

  // }.property('weather.wind_degrees'),

  getWindRange: function(direction){
    var min  = parseInt(direction, 10) - 22.5,
        max  = parseInt(direction, 10) + 22.5;

    return {
      min: min,
      max: max
    };
  }

});
