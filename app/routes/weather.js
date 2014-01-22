export default Ember.Route.extend({

  model: function(params) {
    return this.store.find('weather', params.location_id);
  },

  actions: {
    saveLocation: function (id) {
      var newLocation = this.store.createRecord('weather', {id: id});
      newLocation.save();
    }
  }
});
