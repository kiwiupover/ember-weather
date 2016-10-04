import Ember from 'ember';

export default Ember.Controller.extend({

  needs: ['locations'],

  locations: Ember.computed.alias('controllers.locations'),

  isSavedWeather: false,

  savedLocations: function(){
    if (this.get('locations').filterProperty('id', this.get('id')).length > 0){
      this.set('isSavedWeather', true);
    } else {
      this.set('isSavedWeather', false);
    }
  }.observes('id', 'locations.@each.id')
});
