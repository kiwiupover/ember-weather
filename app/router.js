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
