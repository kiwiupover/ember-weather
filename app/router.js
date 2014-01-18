var Router = Ember.Router.extend(); // ensure we don't share routes between all Router instances

Router.map(function() {
  this.resource('locations');
  this.resource('location', {path: '/location/:location_id'});
});

Router.reopen({
  location: 'history'
});

export default Router;
