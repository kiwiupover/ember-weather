export default function getJSON (url) {
  return new Ember.RSVP.Promise(function(resolve, reject) {
    Ember.$.ajax({ // jquery + runloop + promises = fun times
      type: 'GET',
      url: url,
      success: function(data) {
        Ember.run(null, resolve, data);
      },
      error: function(err) {
        Ember.run(null, reject, err);
      }
    });
  });
}