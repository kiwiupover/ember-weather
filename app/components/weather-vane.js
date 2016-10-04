import Ember from 'ember';

export default Ember.Component.extend({
  windDegrees: 0,
  attributeBindings: 'style',

  style: Ember.computed('windDegrees', function(){
    var degrees = this.get('windDegrees');
    return "-webkit-transform: rotate(" + degrees +"deg); transform: rotate(" + degrees +"deg);";
  })

});
