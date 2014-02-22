export default Ember.Component.extend({
  windDegrees: 0,
  // tagName: 'i',
  // classNames: 'icon-weathervane',

  // attributeBindings: 'style',

  didInsertElement: function(){
    var degrees = this.get('windDegrees'),
        cssRotation = "rotate(" + degrees + "deg)";
        // "-webkit-transform: rotate(" + degrees +"deg), " +
        //               "transform: rotate(" + degrees +"deg)";
    window.console.log("cssRotation: " + cssRotation);
    return this.$('.circle').css({'-webkit-transform': cssRotation, transform: cssRotation});
  }.property('windDegrees')

  // style: function(){
  //   var degrees = this.get('windDegrees') - 0;
  //   return "-webkit-transform: rotate(" + degrees +"deg)";
  // }.property('windDegrees')

});
