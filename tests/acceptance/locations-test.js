import { test } from 'qunit';
import moduleForAcceptance from 'ember-weather/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptances - Locations');

test('locations page renders', function(assert){
  expect(1);
  visit('/locations')

  andThen(function(){
    let title = find('.title-area h1');

    equal(title.text(), 'Ember Weather');
  });
});

test('locations renders a list of weather locations', function(assert){
  expect(3);

  // save a location
  visit('/locations/seattle');
  click('.weather-panel a.save-location');

  andThen( function(){
    visit('/locations');
    var listLength = $('ul.locations-list li').length;
    assert.equal( listLength , 1);
  });

  // Add another location
  andThen(function(){
    visit('/locations/vancouver');
    click('.weather-panel a.save-location');
  });

  andThen(function(){
    visit('/locations');
    var listLength = $('ul.locations-list li').length;
    assert.equal( listLength , 2);
  });

  // navigate back to the weather location
  click($('ul.locations-list li').last());


  // delete the location
  click('.weather-panel a.save-location');

  andThen( function(){
    visit('/locations');
    var listLength = $('ul.locations-list li').length;
    assert.equal( listLength , 1);
  });
});
