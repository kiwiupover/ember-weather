export default Ember.Component.extend({
  tagName: 'li',
  classNames: ['weather-list'],

  click: function(){
    this.sendAction('transitionHandler', this.get('location'));
  }

});
