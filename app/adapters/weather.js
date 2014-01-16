import getJSON from "appkit/utils/get-json";

var Promise = Ember.RSVP.Promise;


export default DS.Adapter.extend({

  find: function(store, type, term) {
    return getJSON('/api/weather/' + term);
  }
});



// version two, needs run loop support though
//
// var RSVP = Ember.RSVP;
//
// function successHandler(resolve) {
//   return function (data, textStatus, jqXHR) {
//     resolve({
//       data: data,
//       textStatus: textStatus,
//       jqXHR: jqXHR
//     });
//   };
// }

// function errorHandler(reject) {
//   return function (data, textStatus, errorThrown) {
//     reject({
//       data: data,
//       textStatus: textStatus,
//       errorThrown: errorThrown
//     });
//   };
// }

// var ajax = {
//   get: function get(url, options) {
//     return new RSVP.Promise(function (resolve, reject) {
//       options.success = successHandler(resolve);
//       options.error = errorHandler(reject);
//       Ember.$.ajax(url, options);
//     });
//   }
// };

// return ajax;
