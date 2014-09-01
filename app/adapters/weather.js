import DS from 'ember-data';
import getJSON from "ember-weather/utils/get-json";

export default DS.Adapter.extend({
  find: function (store, type, id) {
    return getJSON('/api/weather/' + id);
  }
});
