export default Ember.Route.extend({

  model: function (params) {
    // return Ember.RSVP.hash({searchTerm: geoLocation()});

    var model = this.store.find('weather', params.location_id);
    window.console.log("Weather model %o", model);
    return model;
  },

  // serialize: function(model) {
  //   // debugger;
  //   return { location_id: model.get('id') };
  // },

  actions: {
    searchHandler: function (val) {
      window.console.log("the search term from the search handler is", val);
      this.transitionTo('weather', val);
    }
  }
});


// TODO: fixme?
// function geoLocation() {
//   return getLatLng().then(function (latLng) {
//     window.console.log("inside getLatLng %o", latLng);
//     return getCityNameP(latLng);
//   });
// }


// function getLatLng() {
//   return new Ember.RSVP.Promise(function (resolve, reject) {
//     if (window.navigator && window.navigator.geolocation) {
//       window.navigator.geolocation.getCurrentPosition(function(position, err) {
//         if (err) { reject(err); }
//         // position is a JSON object that holds the lat and long
//         // if the call to getCurrentPosition() is successful.
//         var latLng = {
//           lat: position.coords.latitude,
//           lng: position.coords.longitude
//         };
//         window.console.log("the latLng before resolving are %o", latLng);
//         resolve(latLng);
//       });
//     } else {
//       // HTML5 geolocation is not supported for this browser yet
//       // resolve('Seattle');
//     }
//   });
// }

// function getCityNameP(latLng) {
//   window.console.log("inside getCityName function %o");
//   return new Ember.RSVP.Promise(function (resolve, reject) {
//     window.console.log("inside getCityName Promise %o", this);
//     var geocoder = new window.google.maps.Geocoder(),
//         gLatlng = new window.google.maps.LatLng(latLng.lat, latLng.lng);
//     geocoder.geocode({'latLng': gLatlng}, function (results, status) {
//       window.console.log("inside geocoder %o", results);
//       if (status === window.google.maps.GeocoderStatus.OK) {
//         window.console.log("the geocode results are %o", results);
//         var splits = results[5].formatted_address.split(", ", 2);
//         var normalized = splits.join(", ");
//         window.console.log("The split results are %o", normalized);
//         resolve(normalized);
//       } else {
//         window.alert("there was an error");
//       }
//     });
//   });
// }
