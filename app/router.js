import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route("locations", {path: 'locations'}, function(){
    this.route("weather", {path: ':location_id', resetNamespace: true }, function(){

    });
  });
});

export default Router;
