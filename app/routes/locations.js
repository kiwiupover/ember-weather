export default Ember.Route.extend({
  actions: {
    clickHandler: function (location) {
      this.transitionTo('location', location);
    }
  }
});
