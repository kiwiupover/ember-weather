import getJSON from "appkit/utils/get-json";

export default Ember.Component.extend({

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