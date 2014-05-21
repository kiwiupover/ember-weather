export default Ember.Handlebars.makeBoundHelper(function(date) {
  return new Ember.Handlebars.SafeString(moment.unix(date).format('ddd MMM DD'));
});
