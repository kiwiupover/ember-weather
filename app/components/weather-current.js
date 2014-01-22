export default Ember.Component.extend({
  weather: null,

  setupBackGroundImages: function(){
    this._setImageBackGround(this.get('weather.imageUrl'));
  }.observes('weather.imageUrl').on('didInsertElement'),

  actions: {
    saveLocation: function (location) {
      this.sendAction('saveLocationHandler', location);
    },

    removeLocation: function (location) {
      this.sendAction('removeLocationHandler', location);
    }
  },

  _setImageBackGround: function(image){
    this.$('.bg').css('background-image', 'url(' + image + ')');
    this.$('#bg').foggy({
      blurRadius: 12,
      opacity: 1
    });
  }

});
