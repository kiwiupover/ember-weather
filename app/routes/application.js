export default Ember.Route.extend({
  actions: {
    transitionToLocationHandler: function (val) {
      this.transitionTo('location', val);
    }
  }
});