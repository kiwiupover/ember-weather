export default Ember.Route.extend({
  actions: {
    handleTransition: function (location) {
      this.transitionTo('location', location);
    }
  }
});
