import googleGeoLocations from "appkit/utils/google_geolocation";

export default Ember.Route.extend({

  model: function(){
    return this.store.find('location');
  },

  actions: {
    handleSaveLocation: function(weather){

      var id = weather.get('location').split(", ").join('-').toLowerCase();

      var createdLocation = this.store.createRecord('location', {
        id: id,
        location: weather.get('location'),
        searchField: weather.get('searchField'),
        weather: weather
      });

      createdLocation.save();
    },

    handleTransition: function(location){
      this.transitionTo('weather', location);
    }
  }
});
