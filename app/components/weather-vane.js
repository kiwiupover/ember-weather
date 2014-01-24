export default Ember.Component.extend({
  windDegrees: 0,
  tagName: 'i',
  classNames: 'icon-weathervane',

  attributeBindings: 'style',

  style: function(){
    var degrees = this.get('windDegrees') - 180;
    return "-webkit-transform: rotate(" + degrees +"deg)";
  }.property('windDegrees')

});
