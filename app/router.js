var Router = Ember.Router.extend();

Router.map(function() {
  this.resource("locations", {path: 'locations'}, function(){
      this.resource("weather", {path: ':location_id'}, function(){});
  });
});

Router.reopen({
  location: 'history'
});

export default Router;
































































/*

var Router = Ember.Router.extend();

Router.map(function() {
    this.resource('static', {path: 'static'}, function(){
        this.route('seattle');
        this.route('honolulu');
    });

    this.resource("locations", {path: 'locations'}, function(){
        this.resource("weather", {path: ':location_id'}, function(){});
    });

});

Router.reopen({
  // Define the way urls work and look
  location: 'history'
  // Supports three types:
  //
  // location: 'hash'    => example.com/#/locations/seattle
  // location: 'history' => example.com/locations/seattle
  // location: 'none'    => example.com
});

export default Router;

*/
