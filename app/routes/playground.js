var PlayGround = Ember.Route.extend({

  model: function(){
    return this.store.find('playground');
  },

  actions: {
    save: function(playground){
      var model = this.modelFor('playground'),
          playgroundToBeSaved = model.findBy('label', playground.get('title'));

      if (window.confirm("Are you sure you want to save '" + playground.get('title') + "'?")) {
        playgroundToBeSaved.save();
      }
    }
  }

});

export default PlayGround;
