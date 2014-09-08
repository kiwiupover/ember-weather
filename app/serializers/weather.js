import dasherizer from "appkit/utils/dasherizer";

export default DS.JSONSerializer.extend({
  extractFind: function(store, type, payload) {
    var ret = normalizeObject(payload);
    window.console.log("location serializer data is %o", ret);
    return ret;
  },

  extractFindAll: function (store, type, payload) {
    var a_map = Ember.ArrayPolyfills.map;
    var ret = a_map.call(payload, function (record) {
      return normalizeObject(record);
    });

    window.console.log("location findAll serializer data", ret);
    return ret;
  }

});


function normalizeObject(obj) {
  var name = obj.locationName, // TODO: use id only
      weatherCurrent = obj.weatherConditions.currently,
      weatherForecast = obj.weatherForecast.daily.data.slice(0,7),
      imageUrl = mungedImageUrl(obj.imageApi.photos),
      photographer = {};

  if (obj.imageApi.photos.length)
    photographer = obj.imageApi.photos[0].user;


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
    time: weatherCurrent.time
  };
}

/*
Hack to change the last part of the image url to /5.jpg, e.g:

http://ppcdn.500px.org/54543406/aedfc61af4e3ac7c62a6ce08ebf694b6d7fae7ab/2.jpg
-> becomes
http://ppcdn.500px.org/54543406/aedfc61af4e3ac7c62a6ce08ebf694b6d7fae7ab/5.jpg

TODO: re-investigate a better solution, does the api must provide a query for
      returning high res images?
 */
function mungedImageUrl(images) {
  var ret;
  if (images.length > 0) {
    var splitApart = images[0].image_url.split('/');

    splitApart[splitApart.length - 1] = mungImageSize(splitApart[splitApart.length - 1]);

    ret = splitApart.join('/');
  } else {
    ret = '/assets/images/earth.jpg';
  }
  return ret;
}

function mungImageSize(suffix){
  // Need to change the size of the image
  // from 2 to 5
  var splitSuffix = suffix.split('');
  splitSuffix[0] = "5";
  return splitSuffix.join('');
}


