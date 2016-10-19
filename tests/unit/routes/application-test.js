import { test, moduleFor } from 'ember-qunit';

import Application from 'ember-weather/routes/application';

moduleFor('route:application', "Unit - ApplicationRoute");

test("it exists", function(assert){
  assert.ok(this.subject() instanceof Application);
});
