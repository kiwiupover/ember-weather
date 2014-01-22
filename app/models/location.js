export default DS.Model.extend({
  name: DS.attr('string'),
  weather: DS.belongsTo('weather', {async: true})
});
