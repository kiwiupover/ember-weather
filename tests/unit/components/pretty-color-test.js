import {test, moduleForComponent} from 'ember-qunit';

moduleForComponent('pretty-color', "Unit - Component - Pretty Color");

test('Changing colors', function(){
  expect(1);

  var component = this.subject();

  Ember.run(function(){
    component.set('name', 'green');
  });

  equal( this.$().attr('style'), "color: green;");
});


test('template is rendered with the color name', function(){
  expect(2);

  var component = this.subject();

  equal($.trim(this.$().text()), 'Pretty Color:');

  Ember.run(function(){
    component.set('name', 'blue');
  });

  equal($.trim(this.$().text()), 'Pretty Color: blue');
});
