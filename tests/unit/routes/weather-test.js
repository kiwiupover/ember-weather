import { test, moduleFor } from 'ember-qunit';

import Weather from 'ember-weather/routes/weather';

moduleFor('route:weather', "Unit - WeatherRoute");

test("it exists", function(assert){
  assert.ok(this.subject() instanceof Weather);
});
