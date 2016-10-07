import Ember from 'ember';

export default Ember.Component.extend({

  displayDate: Ember.computed('weather.time', function () {
    let time      = this.get('weather.time');
    let timezone  = this.get('weather.timezone');
    return moment.unix(time).tz(timezone).format('MMM DD');
  })

});
