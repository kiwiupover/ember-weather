export default Ember.Component.extend({
  tagName: 'li',
  classNames: ['weather-list'],

  actions: {
    click: function(){
      this.sendAction('transitionToLocation', this.get('location'));
    }
  }
});
