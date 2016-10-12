import Ember from 'ember';
import dasherizer from "ember-weather/utils/dasherizer";

import DS from 'ember-data';

export default DS.JSONSerializer.extend({
  normalizeFindRecordResponse(store, primaryModelClass, payload, id, requestType) {
    var ret = normalizeObject(payload);
    window.console.log("location serializer data is %o", ret);
    return this._super(store, primaryModelClass, ret, id, requestType);
  },

  normalizeFindAllResponse(store, primaryModelClass, payload, id, requestType) {
    var a_map = Ember.ArrayPolyfills.map;
    var ret = a_map.call(payload, function (record) {
      return normalizeObject(record);
    });

    window.console.log("location findAll serializer data", ret);
    return this._super(store, primaryModelClass, ret, id, requestType);
  }
});

function normalizeObject(obj) {
  var name = obj.locationName, // TODO: use id only
      weatherCurrent = obj.weatherConditions.currently,
      weatherForecast = obj.weatherForecast.daily.data.slice(0,7),
      imageUrl = makeImageUrl(obj.imageApi.photos),
      photographer = {};

  if (obj.imageApi.photos.length){
    photographer = obj.imageApi.photos[0].user;
  }

  return {
    id: dasherizer(name),
    name: name,
    forecast: weatherForecast,
    imageUrl: imageUrl,
    photographer: photographer,
    // properties plucked from weatherCurrent object
    temperature: weatherCurrent.temperature,
    tempC: weatherCurrent.temp_c,
    icon: weatherCurrent.icon,
    windSpeed: weatherCurrent.windSpeed,
    windBearing: weatherCurrent.windBearing,
    time: weatherCurrent.time,
    timezone: obj.weatherConditions.timezone
  };
}

function makeImageUrl(images) {
  var ret;
  if (images.length > 0) {
    ret = images[0].image_url;
  } else {
    ret = '/assets/images/earth.jpg';
  }
  return ret;
}
