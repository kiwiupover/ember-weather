import Ember from 'ember';
import dasherizer from "ember-weather/utils/dasherizer";

export default Ember.Route.extend({
  model: function(){
    return  this.store.findAll('location');
  },

  actions: {
    saveLocation: function(weather){
      var locations = this.controllerFor('locations'),
          totalSavedLocations = locations.get('length'),
          id = dasherizer(weather.get('name'));

      if (typeof (totalSavedLocations) === 'undefined' || totalSavedLocations < 7) {
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
