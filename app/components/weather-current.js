export default Ember.Component.extend({
  location: null,

  displayDate: function () {
    return moment.unix(this.get('location.localEpoch')).format('MMM DD');
  }.property('location.localEpoch')

});
