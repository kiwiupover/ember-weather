import Ember from 'ember';

export default Ember.Component.extend({

  days: Ember.computed.alias('forecast'),

  displayDate: Ember.computed('weather.weatherForecast.currently.time', function () {
    return moment.unix(this.get('weather.weatherForecast.currently.time')).format('MMM DD');
  })


});
