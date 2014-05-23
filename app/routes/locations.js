export default Ember.Route.extend({

  model: function() {
    var promise = new Promise(function(resolve, reject){
      setTimeout(function(){
        resolve();
      }, 2000);
    });
    return promise;
  }
});
