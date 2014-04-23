export default Ember.Handlebars.makeBoundHelper(function(value) {
  return new Ember.Handlebars.SafeString(value.toFixed(0));
});
