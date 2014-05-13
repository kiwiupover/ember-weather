export default Ember.Handlebars.makeBoundHelper(function(photographer) {
  if (photographer) {
    debugger;
    return new Ember.Handlebars.SafeString('&copy; <a href="http://500px.com/"' + photographer.username + ' target="_blank">' + photographer.fullname + '</a>');
  }
});
