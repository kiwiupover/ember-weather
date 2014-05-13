var App,
    weatherUrl = 'http://localhost:8000/weather/vancouver-canada';

module('Acceptances - Weather', {
  setup: function(){
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

test('locations/weather renders', function(){
  expect(1);
  visit('/').then(function(){

    visit('/locations/vancouver').then(function(){
      var title = find('.weather-panel h1');

      equal(title.text(), 'Vancouver, Canada');
    });
  });
});
