import Ember from 'ember';
import dasherizer from "ember-weather/utils/dasherizer";
import injectService from 'ember-service/inject';

export default Ember.Route.extend({
  locations: injectService(),

  model: function() {
    return this.store.findAll('location');
  },

  setupController(controller, model) {
    this._super(...arguments);
    this.set('locations.savedLocations', model);
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
      var locations = this.controllerFor('locations').get('model'),
          locationToBeRemoved = locations.findBy('id', weather.id);

      locationToBeRemoved.deleteRecord();
      locationToBeRemoved.save();
    }
  }
});
