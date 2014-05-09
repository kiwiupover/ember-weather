var App;

module('Acceptances - Index', {
  setup: function(){
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

test('index renders', function(){
  expect(1);

  visit('/').then(function(){
    var title = find('h1');

    equal(title.text(), 'the weather is world wide');

  });
});

test('from index page search then go to a locations weather page', function(){
  expect(1);

  visit('/');
  keyEvent('.search input.ember-view', 'keyup', 83);
  keyEvent('.search input.ember-view', 'keyup', 83);
  keyEvent('.search input.ember-view', 'keyup', 83);
  // fillIn('.search input.ember-view', 'Seattle');
  // triggerEvent('.search input.ember-view', 'focus');

  andThen( function() {
    triggerEvent('.search input.ember-view', 'focus');
  });

});

