import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('weather-vane', 'Integration | Component | weather vane', {
  integration: true
});

test('sets the weather direction to 200', function(assert) {

  this.set('windDegrees', 200)
  this.render(hbs`weather-vane windDegrees=windDegrees`);

  let expected = "-webkit-transform: rotate(200deg); transform: rotate(200deg);";
  debugger;
  assert.equal(this.$().attr('style'), expected);
});

test("renders the weather vane", function(assert){
  this.set('windDegrees', 100)
  this.render(hbs`weather-vane windDegrees=windDegrees`);

  let expected = "-webkit-transform: rotate(100deg); transform: rotate(200deg);";
  assert.equal(this.$().attr('style'), expected);
});
