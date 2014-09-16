import Ember from 'ember';

export default Ember.Handlebars.makeBoundHelper(function(value) {
  return new Ember.Handlebars.SafeString(parseInt(value, 10).toFixed(0));
});
