export default Ember.Handlebars.makeBoundHelper(function(type) {
  return new Ember.Handlebars.SafeString('<i aria-hidden="true" class="icon-' + type + '"></i>');
});
