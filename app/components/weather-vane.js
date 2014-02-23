export default Ember.Component.extend({
  windDegrees: 0,
  attributeBindings: 'style',

  style: function(){
    var degrees = this.get('windDegrees');
    return "-webkit-transform: rotate(" + degrees +"deg); transform: rotate(" + degrees +"deg);";
  }.property('windDegrees')

});
