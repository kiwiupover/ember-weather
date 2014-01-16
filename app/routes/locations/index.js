export default Ember.Route.extend({
  model: function (params) {
    return this.modelFor('locations');
  }
});