import Ember from 'ember';

export default Ember.Component.extend({
  classNames: 'search',
  placeholder: "Search for weather around the world",

  setUpTypeahead: function() {
    var typeahead = this.$('input').typeahead({
      name: 'searchTerm',
      valueKey: 'name',
      remote: '/api/search/%QUERY'
    });

    var self = this;

    typeahead.on("typeahead:initialized", function() {
      Ember.run(function () {
        self.$('input').focus();
      });
    });

    typeahead.on("typeahead:selected", function(event, location) {
      Ember.run(function () {
        self.sendAction("transitionToLocation", location.name);
        self.resetValue();
        self.resetList();
      });
    });

    typeahead.on("typeahead:autocompleted", function(event, location) {
      Ember.run(function () {
        self.sendAction("transitionToLocation", location.name);
        self.resetValue();
        self.resetList();
      });
    });
  }.on('didInsertElement'),

  willDestroyElement: function(){
    this.$('input:first').typeahead('destroy');
  },

  resetList: function(){
    this.$('.tt-dropdown-menu').empty();
  },

  resetValue: function(){
    this.$('input.tt-query').blur().val('');
  }

});




