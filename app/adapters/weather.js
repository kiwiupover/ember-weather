/*global localStorage*/
import getJSON from "appkit/utils/get-json";

export default DS.LSAdapter.extend({
  find: function (store, type, id) {
    return getJSON('/api/weather/' + id);
  }
});
