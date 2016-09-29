import moment from 'moment';
import computed from 'ember-computed';
import Component from 'ember-component';

export default Component.extend({

  days: computed.alias('forecast'),

  displayDate: computed('weather.weatherForecast.currently.time', function () {
    return moment.unix(this.get('weather.weatherForecast.currently.time')).format('MMM DD');
  })

});
