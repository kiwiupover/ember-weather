export default Ember.Component.extend({

  days: Ember.computed.alias('forecast.daily.data'),

  displayDate: function () {
    return moment.unix(this.get('weather.weatherForecast.currently.time')).format('MMM DD');
  }.property('weather.weatherForecast.currently.time')


});
