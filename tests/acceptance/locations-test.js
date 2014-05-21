var App;

module('Acceptances - Locations', {
  setup: function(){
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

test('locations page renders', function(){
  expect(1);

  visit('/locations').then(function(){
    var title = find('.title-area h1');

    equal(title.text(), 'Ember Weather');
  });
});

test('locations renders a list of weather locations', function(){
  expect(3);

  // save a location
  visit('/locations/seattle');
  click('.weather-panel a.save-location');

  andThen( function(){
    visit('/locations');
    var listLength = $('ul.locations-list li').length;
    equal( listLength , 1);
  });

  // Add another location
  andThen(function(){
    visit('/locations/vancouver');
    click('.weather-panel a.save-location');
  });

  andThen(function(){
    visit('/locations');
    var listLength = $('ul.locations-list li').length;
    equal( listLength , 2);
  });

  // navigate back to the weather location
  andThen( function(){
    click($('ul.locations-list li').last());
  });

  // delete the location
  andThen( function() {
    click('.weather-panel a.save-location');
  });

  andThen( function(){
    visit('/locations');
    var listLength = $('ul.locations-list li').length;
    equal( listLength , 1);
  });
});

