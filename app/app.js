import Ember from 'ember';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';

Ember.MODEL_FACTORY_INJECTIONS = true;

var App = Ember.Application.extend({
  modulePrefix: 'ember-weather', // TODO: loaded via config
  rootElement: '#main-content',
  Resolver: Resolver
});

loadInitializers(App, 'ember-weather');

export default App;
