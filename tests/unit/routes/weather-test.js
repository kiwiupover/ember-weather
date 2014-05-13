import { test, moduleFor } from 'ember-qunit';

import Weather from 'appkit/routes/weather';

moduleFor('route:weather', "Unit - WeatherRoute");

test("it exists", function(){
  ok(this.subject() instanceof Weather);
});
