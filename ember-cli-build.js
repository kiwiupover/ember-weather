/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    // Add options here
  });

  app.import("bower_components/typeahead.js/dist/typeahead.min.js");
  // app.import("bower_components/ember-data-localstorage-adapter/index.js");
  app.import("bower_components/momentjs/moment.js");
  app.import("bower_components/moment-timezone/builds/moment-timezone-with-data-2010-2020.js");
  app.import("bower_components/foggy/jquery.foggy.js");
  app.import("bower_components/foundation/js/foundation/foundation.js");
  app.import("bower_components/foundation/js/foundation/foundation.topbar.js");
  app.import("bower_components/fastclick/lib/fastclick.js");


  app.import("vendor/fastclick.js");
  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  return app.toTree();
};
