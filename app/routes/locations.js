export default Ember.Route.extend({

  model: function(){
    var model =  this.store.find('location');
    window.console.log('the location model is %o', model);
    return model;
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
