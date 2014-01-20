export default Ember.Route.extend({
  model: function () {
    return this.store.find('location');
  },

  actions: {
    transitionToLocationHandler: function (location) {
      this.transitionTo('location', location);
    },

    saveLocation: function (id) {
      window.console.log("saving location id %o", id);
      var newLocation = this.store.createRecord('location', {id: id});
      newLocation.save();
    }
  }
});
