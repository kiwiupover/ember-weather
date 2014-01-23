export default Ember.Route.extend({
  model: function(){
    return  this.store.find('location');
  },

  actions: {
    saveLocation: function(weather){
      var locations = this.controllerFor('locations'),
          totalSavedLocations = locations.get('length'),
          id = weather.get('name').split(", ").join('-').toLowerCase();

      if (totalSavedLocations < 2) {
        var createdLocation = this.store.createRecord('location', {
          id: id,
          name: weather.get('name'),
          weather: weather
        });

        createdLocation.save();
      } else {
        window.alert('You can only save two locations. ' +
                      'Please remove one before saving again.');
      }
    },

    removeLocation: function(weather){
      var locations = this.controllerFor('locations'),
          locationToBeRemoved = locations.findProperty('id', weather.id);

      locationToBeRemoved.deleteRecord();
      locationToBeRemoved.save();
    }
  }
});
