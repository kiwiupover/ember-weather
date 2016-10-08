import $ from 'jquery';
import computed from 'ember-computed';
import Component from 'ember-component';
import injectService from 'ember-service/inject';

export default Component.extend({
  weather: null,

  locations: injectService(),
  photographer: computed.readOnly('weather.photographer'),

  saved: computed('locations.savedLocations.[]', 'weather.id', function() {
    if (this.get('locations.savedLocations').filterBy('id', this.get('weather.id')).length > 0){
      return true;
    }

    return false;
  }),

  didInsertElement() {
    this._super(...arguments);
    this._setImageBackGround(this.get('weather.imageUrl'));
  },

  didReceiveAttrs(){
    this._super(...arguments);
    this._setImageBackGround(this.get('weather.imageUrl'));
  },

  _setImageBackGround: function(image){
    $('.bg, #bg.bg').css('background-image', 'url(' + image + ')');
    $('#bg').foggy({
      blurRadius: 12,
      opacity: 1
    });
  }

});
