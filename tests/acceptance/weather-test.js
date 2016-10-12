import { test } from 'qunit';
import moduleForAcceptance from 'ember-weather/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptances - Weather');

test('locations/weather renders', function(){
  expect(1);
  visit('/').then(function(){

    visit('/locations/vancouver').then(function(){
      var title = find('.weather-panel h1');

      equal(title.text(), 'Vancouver, Canada');
    });
  });
});
