import Ember from 'ember';
import dasherizer from "ember-weather/utils/dasherizer";

export default Ember.Route.extend({
  actions: {
    transitionToLocationHandler: function (location) {
      this.transitionTo('weather', location);
    },

    transitionToSearchedLocationHandler: function (location) {
      var serializeLocation = dasherizer(location);
      this.transitionTo('weather', serializeLocation);
    }
  }
});
