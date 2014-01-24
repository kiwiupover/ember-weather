export default DS.Model.extend({
  name: DS.attr('string'),
  forecast: DS.attr('string'),
  imageUrl: DS.attr('string'),
  photographer: DS.attr('string'),
  // properties plucked from weatherCurrent in serializer
  tempF: DS.attr('string'),
  icon: DS.attr('string'),
  windGustMph: DS.attr('string'),
  localEpoch: DS.attr('string')
});
