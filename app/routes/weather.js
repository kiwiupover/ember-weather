export default Ember.Route.extend({

  model: function(params) {
    return this.store.find('weather', params.location_id);
  }
});
