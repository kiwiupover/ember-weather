import Ember from 'ember';

export default Ember.Handlebars.makeBoundHelper(function(date, timezone) {
  // return new Ember.Handlebars.SafeString(moment.unix(date).tz(timezone).format('ddd MMM DD'));
  return new Ember.Handlebars.SafeString(moment.unix(date).tz(timezone).format('ddd MMM DD'));
});
