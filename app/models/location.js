export default DS.Model.extend({
  location: DS.attr('string'),
  searchField: DS.attr('string'),
  weather: DS.belongsTo('weather', {async: true})
});
