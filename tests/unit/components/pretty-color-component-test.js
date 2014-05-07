import { test, moduleForComponent } from 'ember-qunit';

moduleForComponent('pretty-color');

test("changing colors", function(){
  var component = this.subject();

  Ember.run(function(){
    component.set('name','red');
  });

  // first call to $() renders the component.
  equal(this.$().attr('style'), 'color: red;');

  Ember.run(function(){
    component.set('name', 'green');
  });

  equal(this.$().attr('style'), 'color: green;');
});

test("template", function(){
  var component = this.subject();

  equal($.trim(this.$().text()), 'Pretty Color:');

  Ember.run(function(){
    component.set('name', 'green');
  });

  equal($.trim(this.$().text()), 'Pretty Color: green');
});
