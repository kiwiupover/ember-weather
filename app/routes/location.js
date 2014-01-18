export default Ember.Route.extend({
  actions: {
    searchHandler: function (val) {
      this.transitionTo('location', val);
    }
  }
});
