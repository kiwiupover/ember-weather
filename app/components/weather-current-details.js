export default Ember.Component.extend({

  displayDate: function () {
    return moment.unix(this.get('weather.localEpoch')).format('MMM DD');
  }.property('weather.localEpoch')


});
