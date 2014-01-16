export default Ember.Component.extend({
  tagName: 'li',
  classNames: ['weather-list'],


  weather: Ember.computed.alias('location.weather'),
  weatherDetails: Ember.computed.alias('location.weather.weather'),

  click: function(){
    this.sendAction('transitionHandler', this.get('weather'));
  }

});
