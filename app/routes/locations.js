export default Ember.Route.extend({
  model: function () {
    return this.modelFor('application'); // reverse change adapter to application
  },

  actions: {
    saveLocation: function (id) {
      var newLocation = this.store.createRecord('location', {id: id});
      newLocation.save();
    }
  }
});
