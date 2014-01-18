import getJSON from "appkit/utils/get-json";

export default DS.Adapter.extend({
  find: function (store, type, id) {
    return getJSON('/api/weather/' + id);
  },

  // findAll: function (store, type) {
  //   return Ember.RSVP.all([
  //     getJSON('/api/weather/seattle'),
  //     getJSON('/api/weather/portland')
  //   ]);
  // }
});