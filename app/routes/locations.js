import dasherizer from "appkit/utils/dasherizer";
export default Ember.Route.extend({
  model: function(){
    return  this.store.find('location');
  },

  serialize: function(model) {
    debugger;
    return { post_id: model.id };
  },

  actions: {
    saveLocation: function(weather){
      var locations = this.controllerFor('locations'),
          totalSavedLocations = locations.get('length'),
          id = dasherizer(weather.get('name'));

      if (totalSavedLocations < 7) {
        var createdLocation = this.store.createRecord('location', {
          id: id,
          name: weather.get('name'),
          weather: weather
        });

        createdLocation.save();
      } else {
        window.alert('You can only save seven locations. ' +
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
