import computed from 'ember-computed';
import Component from 'ember-component';
import injectService from 'ember-service/inject';

export default Component.extend({
  weather: null,

  locations: injectService(),

  saved: computed('locations.savedLocations.[]', 'weather.id', function() {
    if (this.get('locations.savedLocations').filterBy('id', this.get('weather.id')).length > 0){
      return true;
    }

    return false;
  }),

  setupBackGroundImages: Ember.on('didInsertElement', Ember.observer('weather.imageUrl', function(){
    this._setImageBackGround(this.get('weather.imageUrl'));
  })),

  actions: {
    saveLocation: function (location) {
      this.sendAction('saveLocationHandler', location);
    },

    removeLocation: function (location) {
      this.sendAction('removeLocationHandler', location);
    }
  },

  _setImageBackGround: function(image){
    $('.bg, #bg.bg').css('background-image', 'url(' + image + ')');
    $('#bg').foggy({
      blurRadius: 12,
      opacity: 1
    });
  }

});
