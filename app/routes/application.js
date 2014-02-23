export default Ember.Route.extend({
  actions: {
    transitionToLocationHandler: function (location) {
      this.transitionTo('weather', location);
    }
  }
});
