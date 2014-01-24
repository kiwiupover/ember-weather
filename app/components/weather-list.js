export default Ember.Component.extend({
  tagName: 'li',
  classNames: ['weather-list'],

  weather: Ember.computed.alias('location.weather'),

  click: function () {
    this.sendAction('transitionToLocation', this.get('location'));
  }
});
