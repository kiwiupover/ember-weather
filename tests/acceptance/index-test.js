import { test } from 'qunit';
import moduleForAcceptance from 'ember-weather/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | index');

test('visiting homepage', function(assert) {
  visit('/');
  let title = find('h1');

  andThen(() => {
    assert.equal(title.text(), 'the weather is world wide');
  });
});
