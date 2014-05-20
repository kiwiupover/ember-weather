var Playground = Ember.Route.extend({

  model: function(){
    return this.store.findAll('playground', 1);
  }

});


export default Playground;












































  // actions: {
  //   save: function(playground){
  //     var model = this.modelFor('playground'),
  //         playgroundToBeSaved = model.findBy('label', playground.get('title'));

  //     if (window.confirm("Are you sure you want to save '" + playground.get('title') + "'?")) {
  //       playgroundToBeSaved.save();
  //     }
  //   }
  // }
