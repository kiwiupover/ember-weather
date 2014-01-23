import Locations from 'appkit/routes/locations';

var route;
module("Unit - LocationsRoute", {
  setup: function(){
    var container = isolatedContainer([
      'route:locations'
    ]);

    route = container.lookup('route:locations');
  }
});

test("it exists", function(){
  ok(route);
  ok(route instanceof Locations);
});

// test("#model", function(){
//   deepEqual(route.model(), ['red', 'yellow', 'blue']);
// });
