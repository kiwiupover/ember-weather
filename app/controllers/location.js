export default Ember.ObjectController.extend({
  actions: {
    saveLocation: function (location) {
      this.sendAction('saveLocationHandler', location);
    }
  }

});