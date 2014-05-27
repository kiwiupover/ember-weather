import dasherizer from "appkit/utils/dasherizer";

export default Ember.Route.extend({
  actions: {
    transitionToLocationHandler: function (location) {
      this.transitionTo('weather', location.id);
    },

     transitionToSearchedLocationHandler: function (location) {
      var serializeLocation = dasherizer(location);
      this.transitionTo('weather', serializeLocation);
    }
  }
});
