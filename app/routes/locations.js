export default Ember.Route.extend({
  actions: {
    handleSaveLocation: function (weather) {
      var id = weather.get('title').split(", ").join('-').toLowerCase();
      var createdLocation = this.store.createRecord('location', {
        id: id,
        location: weather.get('title'),
        lField: weather.get('lField'),
        weather: weather
      });
      createdLocation.save();
    },

    handleTransition: function (location) {
      this.transitionTo('location', location);
    }
  }
});
