export default Ember.Route.extend({
  model: function () {
    return this.store.find('location');
  },

  actions: {
    transitionToLocationHandler: function (location) {
      this.transitionTo('location', location);
    }
  }
});