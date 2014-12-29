import Ember from 'ember';

export default Ember.Component.extend({

  days: Ember.computed.alias('forecast'),

  displayDate: function () {
    return moment.unix(this.get('weather.weatherForecast.currently.time')).format('MMM DD');
  }.property('weather.weatherForecast.currently.time')
  


});
