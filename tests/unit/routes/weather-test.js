import Weather from 'appkit/routes/weather';

var route;
module("Unit - WeatherRoute", {
  setup: function(){
    var container = isolatedContainer([
      'route:weather'
    ]);

    route = container.lookup('route:weather');
  }
});

test("it exists", function(){
  ok(route);
  ok(route instanceof Weather);
});
