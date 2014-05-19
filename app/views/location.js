export default Ember.View.extend({

  imageUrl: Ember.computed.oneWay('controller.imageUrl'),

  renderBackgroundImage: function () {
    var image = this.get('imageUrl');
    this.setBackgroundImage(image);
  }.on('didInsertElement'),

  didUpdateImageUrl: function(){
    var image = this.get('imageUrl');
    Ember.run.once(this, 'setBackgroundImage', image);
  }.observes('imageUrl'),

  setBackgroundImage: function (image) {
    this.$('.bg').css('background-image', 'url(' + image + ')');
    this.$('#bg').foggy({
      blurRadius: 12,
      opacity: 1
    });
  }

});