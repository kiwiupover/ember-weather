export default Ember.Component.extend({
  location: null,

  imageLarge: function () {
    if (this.get('location.image.image_url')) {
      var img = this.get('location.image.image_url'),
        i = img.split('/');
      i[5] = '5.jpg';
      return i.join('/');
    } else {
      return '/assets/images/earth.jpg';
    }
  }.property('location.image.image_url'),

  setupBackGroundImages: function(){
    this._setBackgroundImage(this.get('imageLarge'));
  }.on('didInsertElement'),

  setImage: function(){
    this._setBackgroundImage(this.get('imageLarge'));
  }.observes('imageLarge'),

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
