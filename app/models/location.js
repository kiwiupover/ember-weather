export default DS.Model.extend({
  title: DS.attr(),
  forecast: DS.attr(),
  imageUrl: DS.attr(),
  // properties plucked from weatherCurrent in serializer
  tempF: DS.attr('number'),
  icon: DS.attr(),
  windGustMph: DS.attr(),
  localEpoch: DS.attr()
});
