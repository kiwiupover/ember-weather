var Router = Ember.Router.extend();

Router.map(function() {

});

Router.reopen({
  location: 'history'
});

export default Router;
































































/*

var Router = Ember.Router.extend();

Router.map(function() {
  this.route('seattle');
  this.route('auckland');
  this.resource('locations', function(){
    this.route('vancouver');
    this.route('richmond');
    this.resource('news', function(){
      this.route('wahoo');
    });
  });
});

export default Router;

*/
