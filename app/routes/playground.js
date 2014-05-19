var Playground = Ember.Route.extend({

  model: function(){
    return this.store.find('playground');
  }

});



Playground.FIXTURES = [
  {
    id: 1,
    date: "Sat Jun 01 2013 00:00:00 GMT-0700 (PDT)",
    high: 64,
    low: 44,
    label: 'San Francisco'
  },
  {
    id: 2,
    date: "Sat Jun 01 2013 00:00:00 GMT-0700 (PDT)",
    high: 93,
    low: 83,
    label: 'Phoenix'
  },
  {
    id: 3,
    date: "Mon Jul 01 2013 00:00:00 GMT-0700 (PDT)",
    high: 66,
    low: 46,
    label: 'San Francisco'
  },
  {
    id: 4,
    date: "Mon Jul 01 2013 00:00:00 GMT-0700 (PDT)",
    high: 103,
    low: 93,
    label: 'Phoenix'
  }
];

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
