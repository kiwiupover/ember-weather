export default DS.Model.extend({
  title: DS.attr('string'),
  weather: DS.attr('string'),
  tempC: DS.attr('number'),
  tempF: DS.attr('number'),
  temperatureString: DS.attr('string'),
  icon: DS.attr('string'),
  iconUrl: DS.attr('string'),
  days: DS.attr('string'),
  image: DS.attr('string'),
  lField: DS.attr('string'),  // http://www.wunderground.com/weather/api/d/docs?d=autocomplete-api&MR=1#using_results
});
