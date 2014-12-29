import Ember from 'ember';

export default Ember.Component.extend({

  displayDate: function () {
    var time      = this.get('weather.time');
    var timezone  = this.get('weather.timezone');
    return moment.unix(time).tz(timezone).format('MMM DD');
  }.property('weather.time')


});
