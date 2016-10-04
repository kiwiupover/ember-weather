import Ember from 'ember';

export default Ember.Component.extend({
  weather: null,

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
