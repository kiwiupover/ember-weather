
import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource("locations", {path: 'locations'}, function(){
    this.resource("weather", {path: ':location_id'}, function(){});
  });
});

export default Router;
