export default Ember.View.extend({

  setupBackGroundImages: function () {
    var image = this.get('controller.imageUrl');
    this.$('.bg').css('background-image', 'url(' + image + ')');
    this.$('#bg').foggy({
      blurRadius: 12,
      opacity: 1
    });
  }.on('didInsertElement')

});