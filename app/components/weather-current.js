export default Ember.Component.extend({
  setupBackGroundImages: function(){
    this._setBackgroundImage(this.get('location.imageLarge'));
  }.on('didInsertElement'),

  setImage: function(){
    this._setBackgroundImage(this.get('location.imageLarge'));
  }.observes('location.imageLarge'),

  actions: {
    saveLocation: function (location) {
      this.sendAction('saveLocationHandler', location);
    }
  },

  _setBackgroundImage: function(image){
    this.$('.bg').css('background-image', 'url(' + image + ')');
    this.$('#bg').foggy({
      blurRadius: 12,
      opacity: 1
    });
  }

});
