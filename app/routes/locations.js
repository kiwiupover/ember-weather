export default Ember.Route.extend({
  model: function(){
    return  this.store.find('location');
  },

  actions: {
    saveLocation: function(weather){
      var id = weather.get('name').split(", ").join('-').toLowerCase();

      var createdLocation = this.store.createRecord('location', {
        id: id,
        name: weather.get('name'),
        weather: weather
      });

      createdLocation.save();
    },

    removeLocation: function(weather){
      var locations = this.controllerFor('locations'),
          locationToBeRemoved = locations.findProperty('id', weather.id);

      locationToBeRemoved.deleteRecord();
      locationToBeRemoved.save();
    }
  }
});
