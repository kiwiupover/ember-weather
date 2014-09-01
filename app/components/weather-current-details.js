import Ember from 'ember';

export default Ember.Component.extend({

  displayDate: function () {
    return moment.unix(this.get('weather.time')).format('MMM DD');
  }.property('weather.time')


});
