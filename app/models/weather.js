import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  forecast: DS.attr(),
  hourlyForecast: DS.attr(),
  weatherConditions: DS.attr(),
  imageUrl: DS.attr('string'),
  photographer: DS.attr('string'),
  // properties plucked from weatherCurrent in serializer
  temperature: DS.attr('numbers'),
  tempC: DS.attr('numbers'),
  icon: DS.attr('string'),
  windSpeed: DS.attr('string'),
  windBearing: DS.attr('string'),
  time: DS.attr('date'),
  timezone: DS.attr('string')
});
