import Resolver from 'resolver';
import stringUtil from 'appkit/utils/string-util';
stringUtil();

/**
 * Canary Features: http://emberjs.com/guides/configuring-ember/feature-flags/
 *
 * Enable individual features: (always enable *before* starting your app)
 *
 *   window.ENV.FEATURES = {
 *     'ember-metal-run-bind': true
 *   };
 *
 * Enable all features:
 *
 *   window.ENV.ENABLE_ALL_FEATURES = true;
 */

var App = Ember.Application.extend({
  LOG_ACTIVE_GENERATION: true,
  LOG_MODULE_RESOLVER: true,
  LOG_TRANSITIONS: true,
  LOG_TRANSITIONS_INTERNAL: true,
  LOG_VIEW_LOOKUPS: true,
  modulePrefix: 'appkit', // TODO: loaded via config
  Resolver: Resolver['default']
});

export default App;
