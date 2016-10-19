import { test, moduleFor } from 'ember-qunit';

import Locations from 'ember-weather/routes/locations';

moduleFor('route:locations', "Unit - LocationsRoute");

test("it exists", function(assert){
  let route = this.subject();
  assert.ok(route);
  assert.ok(route instanceof Locations);
});
