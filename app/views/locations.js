import Ember from 'ember';

export default Ember.View.extend({

  didInsertElement: function() {
    this.$().foundation('topbar');
  },

  willDestroyElement: function() {
    this.$().foundation('topbar', 'off');
  }
});
