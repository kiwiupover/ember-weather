export default DS.Model.extend({
  title: DS.attr('string'),
  weather: DS.attr('string'),
  tempC: DS.attr('number'),
  tempF: DS.attr('number'),
  temperatureString: DS.attr('string'),
  icon: DS.attr('string'),
  iconUrl: DS.attr('string'),
  days: DS.attr('string'),
  image: DS.attr('string'),
  lField: DS.attr('string'),  // http://www.wunderground.com/weather/api/d/docs?d=autocomplete-api&MR=1#using_results

  imageLarge: function () {
    if (this.get('image.image_url')) {
      var img = this.get('image.image_url'),
        i = img.split('/');
      i[5] = '5.jpg';
      return i.join('/');
    } else {
      return '/assets/images/earth.jpg';
    }
  }.property('image.image_url'),

  displayDate: function () {
    var day = moment.unix(this.get('weather.local_epoch'));
    return day.format('MMM Do');
  }.property('weather.local_epoch'),

  eightDays: function () {
    return this.get('days').slice(0,7);
  }.property('days'),

});
