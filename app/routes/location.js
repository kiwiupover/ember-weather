export default Ember.Route.extend({
  actions: {
    saveLocation: function (id) {
      var newLocation = this.store.createRecord('location', {id: id});
      newLocation.save();
    }
  }
});
