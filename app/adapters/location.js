/*global localStorage*/
import getJSON from "appkit/utils/get-json";

export default DS.LSAdapter.extend({
  find: function (store, type, id) {
    return getJSON('/api/weather/' + id);
  },

  /**
   * Find all records saved in local storage, this will only provide a list
   * of saved locations. Then fetch the current weather data for each location
   * from remote API
   *
   * Returns a single promise for an array of promises, where each promise contains
   * the complete and current weather data for respective location saved to local
   * storage
   *
   * Tl;dr - don't save full weather data to local storage, fetch it on every
   * page load so its current. Do save the id(aka city name) so saving locations
   * is possible
   */
  findAll: function (store, type) {
    var namespace = this._namespaceForType(type);
    var a_map = Ember.ArrayPolyfills.map;

    var results = [];
    for (var id in namespace.records) {
      results.push(Ember.copy(namespace.records[id].id));
    }

    return Ember.RSVP.all(a_map.call(results, function (result) {
      return getJSON('/api/weather/' + result);
    }));
  }

});