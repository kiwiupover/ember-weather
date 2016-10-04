import DS from 'ember-data';
import getJSON from "ember-weather/utils/get-json";

export default DS.Adapter.extend({
  findRecord: function (store, type, id) {
    return getJSON('/api/weather/' + id);
  }
});
