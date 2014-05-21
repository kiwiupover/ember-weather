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
    this.resource('static', {path: 'static'}, function(){
        this.route('seattle');
        this.route('honolulu');
    });

    this.resource("locations", {path: 'locations'}, function(){
        this.resource("weather", {path: ':location_id'}, function(){});
    });
});


export default Router;

*/
