import {test, moduleForComponent} from 'ember-qunit';

moduleForComponent('weather-vane', "Unit - Component - Weather Vane");

test("sets the weather directs", function(){
  var component = this.subject();

  Ember.run(function(){
    component.set('windDegrees', 200);
  });

  var expected = "-webkit-transform: rotate(200deg); transform: rotate(200deg);";

  equal(this.$().attr('style'), expected);
});

test("renders the weather vane", function(){
  var component = this.subject();

  Ember.run(function(){
    component.set('windDegrees', 100);
  });

  var weatherVane = this.$();

  var expected = '<div id="ember213" class="ember-view weather-vane" style="-webkit-transform: rotate(100deg); transform: rotate(100deg);"></div>';
  ok(this.$(), expected);
});
