import moment from 'moment';
import computed from 'ember-computed';
import Component from 'ember-component';

export default Component.extend({

  displayDate: computed('weather.time', function () {
    let time      = this.get('weather.time');
    let timezone  = this.get('weather.timezone');
    return moment.unix(time).tz(timezone).format('MMM DD');
  })

});
