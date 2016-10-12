import computed from 'ember-computed';
import Component from 'ember-component';

export default Component.extend({
  windDegrees: 0,
  attributeBindings: 'style',

  style: computed('windDegrees', function(){
    let degrees = this.get('windDegrees');
    return `-webkit-transform: rotate(${degrees}deg); transform: rotate(${degrees}deg);`;
  })

});
