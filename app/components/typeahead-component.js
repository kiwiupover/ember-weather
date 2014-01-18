import getJSON from "appkit/utils/get-json";

/**
 * For performance and testing reasons, try enabling `Ember.testing = true` and try
 * wrapping event handlers provided by outside libraries in a 'run loop'.
 *
 * If you've done it incorrectly you'll get an error in the console, otherwise,
 * you'll get super fast performance (and when it comes times to write some tests,
 * you'll be one step ahead!)
 *
 * Note however, that if you 'forget' to to do so, ember will automagically
 * take of it for you (with a performance cost)
 *
 * Example: (from the file below)
 *
 *   this.typeahead.on("typeahead:selected", function(event, item) {
 *     Ember.run(function () {
 *       self.sendAction("searchMessage", item.name);
 *     });
 *   });
 *
 * or, if your on canary, and have set the ember-metal-run-bind feature flag to true
 * try Ember.run.bind(context, method)
 *
 * Example: (same as above, but using new Ember.run.bind feature via flag)
 *   // before running Ember.Application.create();
 *   window.ENV.FEATURES = {
 *     'ember-metal-run-bind': true
 *   };
 *
 *   self.typeahead.on("typeahead:selected", function(event, item) {
 *     Ember.run.bind(this, this.sendAction("searchMessage", item.name));
 *   });
 */

Ember.testing = true;

var TypeAheadComponent = Ember.Component.extend({
  searchTerm: null,

  setUpTypeahead: function() {
    var typeahead = this.$('input').typeahead({
      name: 'searchTerm',
      valueKey: 'name',
      remote: '/api/search/%QUERY'
    });

    var self = this;

    typeahead.on("typeahead:selected", function(event, item) {
      Ember.run(function () {
        self.sendAction("searchMessage", item.name);
      });
    });

    typeahead.on("typeahead:autocompleted", function(event, item) {
      Ember.run(function () {
        self.sendAction("searchMessage", item.name);
      });
    });

  }.on('didInsertElement')

});

export default TypeAheadComponent;
