var App;

module('Acceptances - Locations', {
  setup: function(){
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

test('locations renders', function(){
  expect(1);

  visit('/locations').then(function(){
    var title = find('.title-area h1');

    equal(title.text(), 'Ember Weather');
  });
});
