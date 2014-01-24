export default DS.Model.extend({
  name: DS.attr('string'),
  forecast: DS.attr('string'),
  imageUrl: DS.attr('string'),
  photographer: DS.attr('string'),
  // properties plucked from weatherCurrent in serializer
  tempF: DS.attr('numbers'),
  tempC: DS.attr('numbers'),
  icon: DS.attr('string'),
  windGustMph: DS.attr('string'),
  windDegrees: DS.attr('string'),
  localEpoch: DS.attr('date')
});
