"use strict";

/* jshint ignore:start */



/* jshint ignore:end */

define('ember-weather/adapters/application', ['exports', 'ember-localstorage-adapter'], function (exports, _emberLocalstorageAdapter) {
  exports['default'] = _emberLocalstorageAdapter['default'].extend({
    namespace: 'ember-weather'
  });
});
define('ember-weather/adapters/ls-adapter', ['exports', 'ember-localstorage-adapter/adapters/ls-adapter'], function (exports, _emberLocalstorageAdapterAdaptersLsAdapter) {
  exports['default'] = _emberLocalstorageAdapterAdaptersLsAdapter['default'];
});
define('ember-weather/adapters/weather', ['exports', 'ember-data', 'ember-weather/utils/get-json'], function (exports, _emberData, _emberWeatherUtilsGetJson) {
  exports['default'] = _emberData['default'].Adapter.extend({
    findRecord: function findRecord(store, type, id) {
      return (0, _emberWeatherUtilsGetJson['default'])('/api/weather/' + id);
    }
  });
});
define('ember-weather/app', ['exports', 'ember', 'ember-weather/resolver', 'ember-load-initializers', 'ember-weather/config/environment'], function (exports, _ember, _emberWeatherResolver, _emberLoadInitializers, _emberWeatherConfigEnvironment) {

  var App = undefined;

  _ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = _ember['default'].Application.extend({
    modulePrefix: _emberWeatherConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _emberWeatherConfigEnvironment['default'].podModulePrefix,
    Resolver: _emberWeatherResolver['default']
  });

  (0, _emberLoadInitializers['default'])(App, _emberWeatherConfigEnvironment['default'].modulePrefix);

  exports['default'] = App;
});
define('ember-weather/components/app-version', ['exports', 'ember-cli-app-version/components/app-version', 'ember-weather/config/environment'], function (exports, _emberCliAppVersionComponentsAppVersion, _emberWeatherConfigEnvironment) {

  var name = _emberWeatherConfigEnvironment['default'].APP.name;
  var version = _emberWeatherConfigEnvironment['default'].APP.version;

  exports['default'] = _emberCliAppVersionComponentsAppVersion['default'].extend({
    version: version,
    name: name
  });
});
define('ember-weather/components/nav-locations', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({

    showMenu: false,
    animateMenu: false,
    classNames: "perspective effect-airbnb",
    classNameBindings: ['showMenu:animate', 'animateMenu:modalview'],

    actions: {
      menu: function menu() {
        this._doPageAnimation();
      },

      link: function link(_link) {
        this._doPageAnimation();
        this.sendAction("transitionToLocation", _link);
      },

      transitionToLocationHandler: function transitionToLocationHandler(location) {
        this._doPageAnimation();
        this.sendAction("transitionToSeachLocation", location);
      },

      transitionToSearchedLocationHandler: function transitionToSearchedLocationHandler(location) {
        this.sendAction("transitionToSeachLocation", location);
      },

      menuClose: function menuClose() {
        if (this.get('showMenu')) {
          this._doPageAnimation();
        }
      }
    },

    _doPageAnimation: function _doPageAnimation() {
      var self = this,
          animateMenu = this.get('animateMenu');

      this.toggleProperty('showMenu');
      if (animateMenu) {
        _ember['default'].run.later(function () {
          self.toggleProperty('animateMenu');
        }, 450);
      } else {
        self.toggleProperty('animateMenu');
      }
    }
  });
});
define('ember-weather/components/weather-current-details', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({

    displayDate: _ember['default'].computed('weather.time', function () {
      return moment.unix(this.get('weather.time')).format('MMM DD');
    })

  });
});
define('ember-weather/components/weather-current', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    weather: null,

    setupBackGroundImages: _ember['default'].on('didInsertElement', _ember['default'].observer('weather.imageUrl', function () {
      this._setImageBackGround(this.get('weather.imageUrl'));
    })),

    actions: {
      saveLocation: function saveLocation(location) {
        this.sendAction('saveLocationHandler', location);
      },

      removeLocation: function removeLocation(location) {
        this.sendAction('removeLocationHandler', location);
      }
    },

    _setImageBackGround: function _setImageBackGround(image) {
      $('.bg, #bg.bg').css('background-image', 'url(' + image + ')');
      $('#bg').foggy({
        blurRadius: 12,
        opacity: 1
      });
    }

  });
});
define('ember-weather/components/weather-forecast', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({

    days: _ember['default'].computed.alias('forecast'),

    displayDate: _ember['default'].computed('weather.weatherForecast.currently.time', function () {
      return moment.unix(this.get('weather.weatherForecast.currently.time')).format('MMM DD');
    })

  });
});
define('ember-weather/components/weather-list', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: 'li',
    classNames: ['weather-list'],

    weather: _ember['default'].computed.alias('location.weather'),

    click: function click() {
      this.sendAction('transitionToLocation', this.get('weather'));
    }
  });
});
define('ember-weather/components/weather-searchbar', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    classNames: 'search',
    placeholder: "Search for weather around the world",

    setUpTypeahead: _ember['default'].on('didInsertElement', function () {
      var typeahead = this.$('input').typeahead({
        name: 'searchTerm',
        valueKey: 'name',
        remote: '/api/search/%QUERY'
      });

      var self = this;

      typeahead.on("typeahead:initialized", function () {
        _ember['default'].run(function () {
          self.$('input').focus();
        });
      });

      typeahead.on("typeahead:selected", function (event, location) {
        _ember['default'].run(function () {
          self.sendAction("transitionToLocation", location.name);
          self.resetValue();
          self.resetList();
        });
      });

      typeahead.on("typeahead:autocompleted", function (event, location) {
        _ember['default'].run(function () {
          self.sendAction("transitionToLocation", location.name);
          self.resetValue();
          self.resetList();
        });
      });
    }),

    willDestroyElement: function willDestroyElement() {
      this.$('input:first').typeahead('destroy');
    },

    resetList: function resetList() {
      this.$('.tt-dropdown-menu').empty();
    },

    resetValue: function resetValue() {
      this.$('input.tt-query').blur().val('');
    }

  });
});
define('ember-weather/components/weather-vane', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    windDegrees: 0,
    attributeBindings: 'style',

    style: _ember['default'].computed('windDegrees', function () {
      var degrees = this.get('windDegrees');
      return "-webkit-transform: rotate(" + degrees + "deg); transform: rotate(" + degrees + "deg);";
    })

  });
});
define('ember-weather/controllers/locations', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend();
});
define('ember-weather/controllers/weather', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({

    needs: ['locations'],

    locations: _ember['default'].computed.alias('controllers.locations'),

    isSavedWeather: false,

    savedLocations: _ember['default'].observer('id', 'locations.@each.id', function () {
      if (this.get('locations').filterProperty('id', this.get('id')).length > 0) {
        this.set('isSavedWeather', true);
      } else {
        this.set('isSavedWeather', false);
      }
    })
  });
});
define('ember-weather/helpers/date-formatter', ['exports', 'ember-string', 'ember-helper'], function (exports, _emberString, _emberHelper) {
  exports.dateFormat = dateFormat;

  function dateFormat(date) {
    return (0, _emberString.htmlSafe)(moment.unix(date).format('ddd MMM DD'));
  }

  exports['default'] = (0, _emberHelper.helper)(dateFormat);
});
define('ember-weather/helpers/icon-name', ['exports', 'ember-string', 'ember-helper'], function (exports, _emberString, _emberHelper) {
  exports.iconName = iconName;

  function iconName(type) {
    return (0, _emberString.htmlSafe)('<i aria-hidden="true" class="icon-' + type + '"></i>');
  }

  exports['default'] = (0, _emberHelper.helper)(iconName);
});
define('ember-weather/helpers/photographer-link', ['exports', 'ember-string', 'ember-helper'], function (exports, _emberString, _emberHelper) {
  exports.photographerLink = photographerLink;

  function photographerLink(photographer) {
    if (photographer) {
      return (0, _emberString.htmlSafe)('&copy; <a href="http://500px.com/' + photographer.username + '" target="_blank">' + photographer.fullname + '</a>');
    }
  }

  exports['default'] = (0, _emberHelper.helper)(photographerLink);
});
define('ember-weather/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _emberInflectorLibHelpersPluralize) {
  exports['default'] = _emberInflectorLibHelpersPluralize['default'];
});
define('ember-weather/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _emberInflectorLibHelpersSingularize) {
  exports['default'] = _emberInflectorLibHelpersSingularize['default'];
});
define('ember-weather/helpers/whole-number', ['exports', 'ember-string', 'ember-helper'], function (exports, _emberString, _emberHelper) {
  exports.wholeNumber = wholeNumber;

  function wholeNumber(value) {
    return (0, _emberString.htmlSafe)(parseInt(value, 10).toFixed(0));
  }

  exports['default'] = (0, _emberHelper.helper)(wholeNumber);
});
define('ember-weather/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'ember-weather/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _emberWeatherConfigEnvironment) {
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(_emberWeatherConfigEnvironment['default'].APP.name, _emberWeatherConfigEnvironment['default'].APP.version)
  };
});
define('ember-weather/initializers/container-debug-adapter', ['exports', 'ember-resolver/container-debug-adapter'], function (exports, _emberResolverContainerDebugAdapter) {
  exports['default'] = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _emberResolverContainerDebugAdapter['default']);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('ember-weather/initializers/data-adapter', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `data-adapter` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'data-adapter',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define('ember-weather/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data/-private/core'], function (exports, _emberDataSetupContainer, _emberDataPrivateCore) {

  /*
  
    This code initializes Ember-Data onto an Ember application.
  
    If an Ember.js developer defines a subclass of DS.Store on their application,
    as `App.StoreService` (or via a module system that resolves to `service:store`)
    this code will automatically instantiate it and make it available on the
    router.
  
    Additionally, after an application's controllers have been injected, they will
    each have the store made available to them.
  
    For example, imagine an Ember.js application with the following classes:
  
    App.StoreService = DS.Store.extend({
      adapter: 'custom'
    });
  
    App.PostsController = Ember.ArrayController.extend({
      // ...
    });
  
    When the application is initialized, `App.ApplicationStore` will automatically be
    instantiated, and the instance of `App.PostsController` will have its `store`
    property set to that instance.
  
    Note that this code will only be run if the `ember-application` package is
    loaded. If Ember Data is being used in an environment other than a
    typical application (e.g., node.js where only `ember-runtime` is available),
    this code will be ignored.
  */

  exports['default'] = {
    name: 'ember-data',
    initialize: _emberDataSetupContainer['default']
  };
});
define('ember-weather/initializers/export-application-global', ['exports', 'ember', 'ember-weather/config/environment'], function (exports, _ember, _emberWeatherConfigEnvironment) {
  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_emberWeatherConfigEnvironment['default'].exportApplicationGlobal !== false) {
      var value = _emberWeatherConfigEnvironment['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember['default'].String.classify(_emberWeatherConfigEnvironment['default'].modulePrefix);
      }

      if (!window[globalName]) {
        window[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete window[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('ember-weather/initializers/injectStore', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `injectStore` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'injectStore',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define('ember-weather/initializers/store', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `store` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'store',
    after: 'ember-data',
    initialize: _ember['default'].K
  };
});
define('ember-weather/initializers/transforms', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `transforms` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'transforms',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define("ember-weather/instance-initializers/ember-data", ["exports", "ember-data/-private/instance-initializers/initialize-store-service"], function (exports, _emberDataPrivateInstanceInitializersInitializeStoreService) {
  exports["default"] = {
    name: "ember-data",
    initialize: _emberDataPrivateInstanceInitializersInitializeStoreService["default"]
  };
});
define('ember-weather/models/location', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({
    name: _emberData['default'].attr('string'),
    weather: _emberData['default'].belongsTo('weather', { async: true })
  });
});
define('ember-weather/models/weather', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({
    name: _emberData['default'].attr('string'),
    forecast: _emberData['default'].attr(),
    weatherConditions: _emberData['default'].attr(),
    imageUrl: _emberData['default'].attr('string'),
    photographer: _emberData['default'].attr('string'),
    // properties plucked from weatherCurrent in serializer
    temperature: _emberData['default'].attr('number'),
    tempC: _emberData['default'].attr('number'),
    icon: _emberData['default'].attr('string'),
    windSpeed: _emberData['default'].attr('string'),
    windBearing: _emberData['default'].attr('string'),
    time: _emberData['default'].attr('date')
  });
});
define('ember-weather/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  exports['default'] = _emberResolver['default'];
});
define('ember-weather/router', ['exports', 'ember', 'ember-weather/config/environment'], function (exports, _ember, _emberWeatherConfigEnvironment) {

  var Router = _ember['default'].Router.extend({
    location: _emberWeatherConfigEnvironment['default'].locationType,
    rootURL: _emberWeatherConfigEnvironment['default'].rootURL
  });

  Router.map(function () {
    this.resource("locations", { path: 'locations' }, function () {
      this.resource("weather", { path: ':location_id' }, function () {});
    });
  });

  exports['default'] = Router;
});
define('ember-weather/routes/application', ['exports', 'ember', 'ember-weather/utils/dasherizer'], function (exports, _ember, _emberWeatherUtilsDasherizer) {
  exports['default'] = _ember['default'].Route.extend({
    actions: {
      transitionToLocationHandler: function transitionToLocationHandler(location) {
        this.transitionTo('weather', location.get('id'));
      },

      transitionToSearchedLocationHandler: function transitionToSearchedLocationHandler(location) {
        var serializeLocation = (0, _emberWeatherUtilsDasherizer['default'])(location);
        this.transitionTo('weather', serializeLocation);
      }
    }
  });
});
define('ember-weather/routes/locations', ['exports', 'ember', 'ember-weather/utils/dasherizer'], function (exports, _ember, _emberWeatherUtilsDasherizer) {
  exports['default'] = _ember['default'].Route.extend({
    model: function model() {
      return this.store.findAll('location');
    },

    actions: {
      saveLocation: function saveLocation(weather) {
        var locations = this.controllerFor('locations'),
            totalSavedLocations = locations.get('length'),
            id = (0, _emberWeatherUtilsDasherizer['default'])(weather.get('name'));

        if (totalSavedLocations < 7) {
          var createdLocation = this.store.createRecord('location', {
            id: id,
            name: weather.get('name'),
            weather: weather
          });

          createdLocation.save();
        } else {
          window.alert('You can only save seven locations. ' + 'Please remove one before saving again.');
        }
      },

      removeLocation: function removeLocation(weather) {
        var locations = this.controllerFor('locations'),
            locationToBeRemoved = locations.findProperty('id', weather.id);

        locationToBeRemoved.deleteRecord();
        locationToBeRemoved.save();
      }
    }
  });
});
define('ember-weather/routes/weather', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    model: function model(params) {
      return this.store.findRecord('weather', params.location_id);
    }
  });
});
define('ember-weather/serializers/ls-serializer', ['exports', 'ember-localstorage-adapter/serializers/ls-serializer'], function (exports, _emberLocalstorageAdapterSerializersLsSerializer) {
  exports['default'] = _emberLocalstorageAdapterSerializersLsSerializer['default'];
});
define('ember-weather/serializers/weather', ['exports', 'ember', 'ember-weather/utils/dasherizer', 'ember-data'], function (exports, _ember, _emberWeatherUtilsDasherizer, _emberData) {
  exports['default'] = _emberData['default'].JSONSerializer.extend({
    normalizeFindRecordResponse: function normalizeFindRecordResponse(store, primaryModelClass, payload, id, requestType) {
      var ret = normalizeObject(payload);
      window.console.log("location serializer data is %o", ret);
      return this._super(store, primaryModelClass, ret, id, requestType);
    },

    normalizeFindAllResponse: function normalizeFindAllResponse(store, primaryModelClass, payload) {
      var a_map = _ember['default'].ArrayPolyfills.map;
      var ret = a_map.call(payload, function (record) {
        return normalizeObject(record);
      });

      window.console.log("location findAll serializer data", ret);
      return this._super(store, primaryModelClass, ret, id, requestType);
    }
  });

  function normalizeObject(obj) {
    var name = obj.locationName,
        // TODO: use id only
    weatherCurrent = obj.weatherConditions.currently,
        weatherForecast = obj.weatherForecast.daily.data.slice(0, 7),
        imageUrl = makeImageUrl(obj.imageApi.photos),
        photographer = {};

    if (obj.imageApi.photos.length) {
      photographer = obj.imageApi.photos[0].user;
    }

    return {
      id: (0, _emberWeatherUtilsDasherizer['default'])(name),
      name: name,
      forecast: weatherForecast,
      imageUrl: imageUrl,
      photographer: photographer,
      // properties plucked from weatherCurrent object
      temperature: weatherCurrent.temperature,
      tempC: weatherCurrent.temp_c,
      icon: weatherCurrent.icon,
      windSpeed: weatherCurrent.windSpeed,
      windBearing: weatherCurrent.windBearing,
      time: weatherCurrent.time
    };
  }

  function makeImageUrl(images) {
    var ret;
    if (images.length > 0) {
      ret = images[0].image_url;
    } else {
      ret = '/assets/images/earth.jpg';
    }
    return ret;
  }
});
define('ember-weather/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _emberAjaxServicesAjax) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberAjaxServicesAjax['default'];
    }
  });
});
define("ember-weather/templates/-nav", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "revision": "Ember@2.8.1",
          "loc": {
            "source": null,
            "start": {
              "line": 4,
              "column": 10
            },
            "end": {
              "line": 4,
              "column": 47
            }
          },
          "moduleName": "ember-weather/templates/-nav.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Ember Weather");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "revision": "Ember@2.8.1",
            "loc": {
              "source": null,
              "start": {
                "line": 13,
                "column": 12
              },
              "end": {
                "line": 13,
                "column": 55
              }
            },
            "moduleName": "ember-weather/templates/-nav.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
            dom.insertBoundary(fragment, 0);
            dom.insertBoundary(fragment, null);
            return morphs;
          },
          statements: [["content", "this.name", ["loc", [null, [13, 42], [13, 55]]], 0, 0, 0, 0]],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "revision": "Ember@2.8.1",
          "loc": {
            "source": null,
            "start": {
              "line": 12,
              "column": 6
            },
            "end": {
              "line": 14,
              "column": 6
            }
          },
          "moduleName": "ember-weather/templates/-nav.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("        ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("li");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 0, 0);
          return morphs;
        },
        statements: [["block", "link-to", ["weather", ["get", "this.id", ["loc", [null, [13, 33], [13, 40]]], 0, 0, 0, 0]], [], 0, null, ["loc", [null, [13, 12], [13, 67]]]]],
        locals: [],
        templates: [child0]
      };
    })();
    return {
      meta: {
        "revision": "Ember@2.8.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 24,
            "column": 0
          }
        },
        "moduleName": "ember-weather/templates/-nav.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("nav");
        dom.setAttribute(el1, "class", "top-bar");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("ul");
        dom.setAttribute(el2, "class", "title-area");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        dom.setAttribute(el3, "class", "name");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("h1");
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        dom.setAttribute(el3, "class", "toggle-topbar menu-icon");
        var el4 = dom.createElement("a");
        var el5 = dom.createElement("span");
        var el6 = dom.createTextNode("Menu");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("section");
        dom.setAttribute(el2, "class", "top-bar-section");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment(" Left Nav Section ");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("ul");
        dom.setAttribute(el3, "class", "left");
        var el4 = dom.createTextNode("\n");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("ul");
        dom.setAttribute(el3, "class", "right hide-for-small-only");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var element1 = dom.childAt(element0, [1]);
        var element2 = dom.childAt(element1, [3, 0]);
        var element3 = dom.childAt(element0, [3]);
        var morphs = new Array(4);
        morphs[0] = dom.createMorphAt(dom.childAt(element1, [1, 1]), 0, 0);
        morphs[1] = dom.createElementMorph(element2);
        morphs[2] = dom.createMorphAt(dom.childAt(element3, [3]), 1, 1);
        morphs[3] = dom.createMorphAt(dom.childAt(element3, [5, 1]), 1, 1);
        return morphs;
      },
      statements: [["block", "link-to", ["locations"], [], 0, null, ["loc", [null, [4, 10], [4, 59]]]], ["element", "action", ["menu"], [], ["loc", [null, [6, 43], [6, 60]]], 0, 0], ["block", "each", [["get", "model", ["loc", [null, [12, 14], [12, 19]]], 0, 0, 0, 0]], [], 1, null, ["loc", [null, [12, 6], [14, 15]]]], ["inline", "weather-searchbar", [], ["transitionToLocation", "transitionToSearchedLocationHandler", "placeholder", "Search for a city anywhere"], ["loc", [null, [18, 8], [19, 70]]], 0, 0]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("ember-weather/templates/application", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@2.8.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "ember-weather/templates/application.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["content", "outlet", ["loc", [null, [1, 0], [1, 10]]], 0, 0, 0, 0]],
      locals: [],
      templates: []
    };
  })());
});
define("ember-weather/templates/components/nav-locations", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "revision": "Ember@2.8.1",
          "loc": {
            "source": null,
            "start": {
              "line": 8,
              "column": 4
            },
            "end": {
              "line": 10,
              "column": 4
            }
          },
          "moduleName": "ember-weather/templates/components/nav-locations.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("      ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("li");
          var el2 = dom.createElement("a");
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1, 0]);
          var morphs = new Array(2);
          morphs[0] = dom.createElementMorph(element0);
          morphs[1] = dom.createMorphAt(element0, 0, 0);
          return morphs;
        },
        statements: [["element", "action", ["link", ["get", "this", ["loc", [null, [9, 29], [9, 33]]], 0, 0, 0, 0]], [], ["loc", [null, [9, 13], [9, 35]]], 0, 0], ["content", "name", ["loc", [null, [9, 36], [9, 44]]], 0, 0, 0, 0]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "revision": "Ember@2.8.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 19,
            "column": 0
          }
        },
        "moduleName": "ember-weather/templates/components/nav-locations.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("nav");
        dom.setAttribute(el1, "class", "outer-nav left vertical");
        var el2 = dom.createTextNode("\n\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("ul");
        dom.setAttribute(el2, "class", "no-bullet");
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "container");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element1 = dom.childAt(fragment, [2]);
        var element2 = dom.childAt(fragment, [4]);
        var morphs = new Array(5);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createMorphAt(element1, 1, 1);
        morphs[2] = dom.createMorphAt(dom.childAt(element1, [3]), 1, 1);
        morphs[3] = dom.createElementMorph(element2);
        morphs[4] = dom.createMorphAt(element2, 1, 1);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["inline", "partial", ["nav"], [], ["loc", [null, [1, 0], [1, 17]]], 0, 0], ["inline", "weather-searchbar", [], ["transitionToLocation", "transitionToLocationHandler", "placeholder", "Search for a city anywhere"], ["loc", [null, [4, 2], [5, 64]]], 0, 0], ["block", "each", [["get", "model", ["loc", [null, [8, 12], [8, 17]]], 0, 0, 0, 0]], [], 0, null, ["loc", [null, [8, 4], [10, 13]]]], ["element", "action", ["menuClose"], ["on", "click"], ["loc", [null, [15, 23], [15, 56]]], 0, 0], ["content", "yield", ["loc", [null, [16, 2], [16, 11]]], 0, 0, 0, 0]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("ember-weather/templates/components/weather-current-details", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@2.8.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 24,
            "column": 0
          }
        },
        "moduleName": "ember-weather/templates/components/weather-current-details.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "current-details");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "temp-date");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "temp");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("°\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "display-date");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "wind-icon");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "large-icon");
        var el4 = dom.createTextNode("\n       ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "wind-direction");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("span");
        dom.setAttribute(el4, "class", "speed");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("mph\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("span");
        dom.setAttribute(el4, "class", "direction");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var element1 = dom.childAt(element0, [1]);
        var element2 = dom.childAt(element0, [3]);
        var element3 = dom.childAt(element2, [3]);
        var morphs = new Array(5);
        morphs[0] = dom.createMorphAt(dom.childAt(element1, [1]), 1, 1);
        morphs[1] = dom.createMorphAt(dom.childAt(element1, [3]), 1, 1);
        morphs[2] = dom.createMorphAt(dom.childAt(element2, [1]), 1, 1);
        morphs[3] = dom.createMorphAt(dom.childAt(element3, [1]), 1, 1);
        morphs[4] = dom.createMorphAt(dom.childAt(element3, [3]), 1, 1);
        return morphs;
      },
      statements: [["inline", "whole-number", [["get", "weather.temperature", ["loc", [null, [4, 21], [4, 40]]], 0, 0, 0, 0]], [], ["loc", [null, [4, 6], [4, 42]]], 0, 0], ["content", "displayDate", ["loc", [null, [7, 6], [7, 21]]], 0, 0, 0, 0], ["inline", "icon-name", [["get", "weather.icon", ["loc", [null, [12, 19], [12, 31]]], 0, 0, 0, 0]], [], ["loc", [null, [12, 7], [12, 33]]], 0, 0], ["content", "weather.windSpeed", ["loc", [null, [16, 8], [16, 29]]], 0, 0, 0, 0], ["inline", "weather-vane", [], ["windDegrees", ["subexpr", "@mut", [["get", "weather.windBearing", ["loc", [null, [19, 35], [19, 54]]], 0, 0, 0, 0]], [], [], 0, 0]], ["loc", [null, [19, 8], [19, 56]]], 0, 0]],
      locals: [],
      templates: []
    };
  })());
});
define("ember-weather/templates/components/weather-current", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "revision": "Ember@2.8.1",
          "loc": {
            "source": null,
            "start": {
              "line": 5,
              "column": 4
            },
            "end": {
              "line": 7,
              "column": 4
            }
          },
          "moduleName": "ember-weather/templates/components/weather-current.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("      ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("a");
          dom.setAttribute(el1, "class", "save-location");
          var el2 = dom.createTextNode("Remove Location");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element1 = dom.childAt(fragment, [1]);
          var morphs = new Array(1);
          morphs[0] = dom.createElementMorph(element1);
          return morphs;
        },
        statements: [["element", "action", ["removeLocation", ["get", "weather", ["loc", [null, [6, 57], [6, 64]]], 0, 0, 0, 0]], [], ["loc", [null, [6, 31], [6, 66]]], 0, 0]],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "revision": "Ember@2.8.1",
          "loc": {
            "source": null,
            "start": {
              "line": 7,
              "column": 4
            },
            "end": {
              "line": 9,
              "column": 4
            }
          },
          "moduleName": "ember-weather/templates/components/weather-current.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("      ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("a");
          dom.setAttribute(el1, "class", "save-location");
          var el2 = dom.createTextNode("Save Location");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var morphs = new Array(1);
          morphs[0] = dom.createElementMorph(element0);
          return morphs;
        },
        statements: [["element", "action", ["saveLocation", ["get", "weather", ["loc", [null, [8, 55], [8, 62]]], 0, 0, 0, 0]], [], ["loc", [null, [8, 31], [8, 64]]], 0, 0]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "revision": "Ember@2.8.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 22,
            "column": 0
          }
        },
        "moduleName": "ember-weather/templates/components/weather-current.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "weather-panel bg");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "small-12 columns");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h1");
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "attribution");
        var el3 = dom.createTextNode("\n    photo by: ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "weather-stript");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "forecast");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element2 = dom.childAt(fragment, [0]);
        var element3 = dom.childAt(element2, [1]);
        var element4 = dom.childAt(fragment, [2]);
        var morphs = new Array(5);
        morphs[0] = dom.createMorphAt(dom.childAt(element3, [1]), 0, 0);
        morphs[1] = dom.createMorphAt(element3, 3, 3);
        morphs[2] = dom.createMorphAt(dom.childAt(element2, [3]), 1, 1);
        morphs[3] = dom.createMorphAt(element4, 1, 1);
        morphs[4] = dom.createMorphAt(dom.childAt(element4, [3]), 1, 1);
        return morphs;
      },
      statements: [["content", "weather.name", ["loc", [null, [3, 8], [3, 24]]], 0, 0, 0, 0], ["block", "if", [["get", "saved", ["loc", [null, [5, 10], [5, 15]]], 0, 0, 0, 0]], [], 0, 1, ["loc", [null, [5, 4], [9, 11]]]], ["inline", "photographer-link", [["get", "weather.photographer", ["loc", [null, [12, 34], [12, 54]]], 0, 0, 0, 0]], [], ["loc", [null, [12, 14], [12, 56]]], 0, 0], ["inline", "weather-current-details", [], ["weather", ["subexpr", "@mut", [["get", "weather", ["loc", [null, [17, 36], [17, 43]]], 0, 0, 0, 0]], [], [], 0, 0]], ["loc", [null, [17, 2], [17, 45]]], 0, 0], ["inline", "weather-forecast", [], ["forecast", ["subexpr", "@mut", [["get", "weather.forecast", ["loc", [null, [19, 32], [19, 48]]], 0, 0, 0, 0]], [], [], 0, 0]], ["loc", [null, [19, 4], [19, 50]]], 0, 0]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("ember-weather/templates/components/weather-forecast", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "revision": "Ember@2.8.1",
          "loc": {
            "source": null,
            "start": {
              "line": 2,
              "column": 2
            },
            "end": {
              "line": 11,
              "column": 2
            }
          },
          "moduleName": "ember-weather/templates/components/weather-forecast.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("li");
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2, "class", "label round");
          var el3 = dom.createTextNode("\n        ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("span");
          dom.setAttribute(el2, "class", "high");
          var el3 = dom.createElement("small");
          var el4 = dom.createTextNode("high");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode(" ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("°");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("span");
          dom.setAttribute(el2, "class", "low");
          var el3 = dom.createElement("small");
          var el4 = dom.createTextNode("low");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode(" ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("°");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var morphs = new Array(4);
          morphs[0] = dom.createMorphAt(dom.childAt(element0, [1]), 1, 1);
          morphs[1] = dom.createMorphAt(element0, 3, 3);
          morphs[2] = dom.createMorphAt(dom.childAt(element0, [5]), 2, 2);
          morphs[3] = dom.createMorphAt(dom.childAt(element0, [7]), 2, 2);
          return morphs;
        },
        statements: [["inline", "date-formatter", [["get", "time", ["loc", [null, [5, 25], [5, 29]]], 0, 0, 0, 0]], [], ["loc", [null, [5, 8], [5, 31]]], 0, 0], ["inline", "icon-name", [["get", "icon", ["loc", [null, [7, 18], [7, 22]]], 0, 0, 0, 0]], [], ["loc", [null, [7, 6], [7, 24]]], 0, 0], ["inline", "whole-number", [["get", "temperatureMax", ["loc", [null, [8, 60], [8, 74]]], 0, 0, 0, 0]], [], ["loc", [null, [8, 45], [8, 76]]], 0, 0], ["inline", "whole-number", [["get", "temperatureMin", ["loc", [null, [9, 58], [9, 72]]], 0, 0, 0, 0]], [], ["loc", [null, [9, 43], [9, 74]]], 0, 0]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "revision": "Ember@2.8.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 13,
            "column": 0
          }
        },
        "moduleName": "ember-weather/templates/components/weather-forecast.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("ul");
        dom.setAttribute(el1, "class", "no-bullet");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0]), 1, 1);
        return morphs;
      },
      statements: [["block", "each", [["get", "days", ["loc", [null, [2, 10], [2, 14]]], 0, 0, 0, 0]], [], 0, null, ["loc", [null, [2, 2], [11, 11]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("ember-weather/templates/components/weather-list", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "revision": "Ember@2.8.1",
            "loc": {
              "source": null,
              "start": {
                "line": 6,
                "column": 4
              },
              "end": {
                "line": 8,
                "column": 4
              }
            },
            "moduleName": "ember-weather/templates/components/weather-list.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("      ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("h3");
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("°");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 0, 0);
            return morphs;
          },
          statements: [["inline", "whole-number", [["get", "weather.temperature", ["loc", [null, [7, 25], [7, 44]]], 0, 0, 0, 0]], [], ["loc", [null, [7, 10], [7, 46]]], 0, 0]],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "revision": "Ember@2.8.1",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 13,
              "column": 0
            }
          },
          "moduleName": "ember-weather/templates/components/weather-list.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "title");
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("h3");
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "temp");
          var el2 = dom.createTextNode("\n");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "icon");
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(3);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1, 1]), 0, 0);
          morphs[1] = dom.createMorphAt(dom.childAt(fragment, [3]), 1, 1);
          morphs[2] = dom.createMorphAt(dom.childAt(fragment, [5]), 1, 1);
          return morphs;
        },
        statements: [["content", "location.name", ["loc", [null, [3, 8], [3, 25]]], 0, 0, 0, 0], ["block", "if", [["get", "weather.temperature", ["loc", [null, [6, 10], [6, 29]]], 0, 0, 0, 0]], [], 0, null, ["loc", [null, [6, 4], [8, 11]]]], ["inline", "icon-name", [["get", "weather.icon", ["loc", [null, [11, 16], [11, 28]]], 0, 0, 0, 0]], [], ["loc", [null, [11, 4], [11, 30]]], 0, 0]],
        locals: [],
        templates: [child0]
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "revision": "Ember@2.8.1",
          "loc": {
            "source": null,
            "start": {
              "line": 13,
              "column": 0
            },
            "end": {
              "line": 15,
              "column": 0
            }
          },
          "moduleName": "ember-weather/templates/components/weather-list.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("h1");
          var el2 = dom.createTextNode("No saved locations");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "revision": "Ember@2.8.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 16,
            "column": 0
          }
        },
        "moduleName": "ember-weather/templates/components/weather-list.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "if", [["get", "location", ["loc", [null, [1, 6], [1, 14]]], 0, 0, 0, 0]], [], 0, 1, ["loc", [null, [1, 0], [15, 7]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("ember-weather/templates/components/weather-searchbar", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@2.8.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "ember-weather/templates/components/weather-searchbar.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["inline", "input", [], ["value", ["subexpr", "@mut", [["get", "searchTerm", ["loc", [null, [1, 14], [1, 24]]], 0, 0, 0, 0]], [], [], 0, 0], "placeholder", ["subexpr", "@mut", [["get", "placeholder", ["loc", [null, [1, 37], [1, 48]]], 0, 0, 0, 0]], [], [], 0, 0]], ["loc", [null, [1, 0], [1, 50]]], 0, 0]],
      locals: [],
      templates: []
    };
  })());
});
define("ember-weather/templates/components/weather-vane", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@2.8.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 6,
            "column": 0
          }
        },
        "moduleName": "ember-weather/templates/components/weather-vane.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "weather-vane");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "circle");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "arrow");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() {
        return [];
      },
      statements: [],
      locals: [],
      templates: []
    };
  })());
});
define("ember-weather/templates/error", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@2.8.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 6,
            "column": 0
          }
        },
        "moduleName": "ember-weather/templates/error.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h1");
        var el2 = dom.createTextNode("Sorry, Something went wrong");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("pre");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        morphs[1] = dom.createMorphAt(dom.childAt(fragment, [4]), 1, 1);
        return morphs;
      },
      statements: [["content", "message", ["loc", [null, [2, 0], [2, 11]]], 0, 0, 0, 0], ["content", "stack", ["loc", [null, [4, 0], [4, 9]]], 0, 0, 0, 0]],
      locals: [],
      templates: []
    };
  })());
});
define("ember-weather/templates/index", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@2.8.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 7,
            "column": 0
          }
        },
        "moduleName": "ember-weather/templates/index.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "id", "bg");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "row text-center main-title");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("h1");
        var el3 = dom.createTextNode("the weather is world wide");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 4, 4, contextualElement);
        return morphs;
      },
      statements: [["inline", "weather-searchbar", [], ["transitionToLocation", "transitionToSearchedLocationHandler"], ["loc", [null, [6, 0], [6, 80]]], 0, 0]],
      locals: [],
      templates: []
    };
  })());
});
define("ember-weather/templates/loading", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@2.8.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 5,
            "column": 0
          }
        },
        "moduleName": "ember-weather/templates/loading.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "loading-wrapper");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "loading");
        var el3 = dom.createTextNode("loading");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() {
        return [];
      },
      statements: [],
      locals: [],
      templates: []
    };
  })());
});
define("ember-weather/templates/locations", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "revision": "Ember@2.8.1",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 3,
              "column": 0
            }
          },
          "moduleName": "ember-weather/templates/locations.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["content", "outlet", ["loc", [null, [2, 2], [2, 12]]], 0, 0, 0, 0]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "revision": "Ember@2.8.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 5,
            "column": 0
          }
        },
        "moduleName": "ember-weather/templates/locations.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("section");
        dom.setAttribute(el1, "id", "bg");
        dom.setAttribute(el1, "class", "bg");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["block", "nav-locations", [], ["model", ["subexpr", "@mut", [["get", "content", ["loc", [null, [1, 23], [1, 30]]], 0, 0, 0, 0]], [], [], 0, 0], "transitionToLocation", "transitionToLocationHandler", "transitionToSeachLocation", "transitionToSearchedLocationHandler"], 0, null, ["loc", [null, [1, 0], [3, 18]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("ember-weather/templates/locations/index", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "revision": "Ember@2.8.1",
          "loc": {
            "source": null,
            "start": {
              "line": 2,
              "column": 2
            },
            "end": {
              "line": 4,
              "column": 2
            }
          },
          "moduleName": "ember-weather/templates/locations/index.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "weather-list", [], ["location", ["subexpr", "@mut", [["get", "location", ["loc", [null, [3, 28], [3, 36]]], 0, 0, 0, 0]], [], [], 0, 0], "transitionToLocation", "transitionToLocationHandler"], ["loc", [null, [3, 4], [3, 89]]], 0, 0]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "revision": "Ember@2.8.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 6,
            "column": 0
          }
        },
        "moduleName": "ember-weather/templates/locations/index.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("ul");
        dom.setAttribute(el1, "class", "locations-list no-bullet columns small-12 medium-8 small-centered");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0]), 1, 1);
        return morphs;
      },
      statements: [["block", "each", [["get", "location", ["loc", [null, [2, 10], [2, 18]]], 0, 0, 0, 0], ["get", "in", ["loc", [null, [2, 19], [2, 21]]], 0, 0, 0, 0], ["get", "model", ["loc", [null, [2, 22], [2, 27]]], 0, 0, 0, 0]], [], 0, null, ["loc", [null, [2, 2], [4, 11]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("ember-weather/templates/locations/loading", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@2.8.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "ember-weather/templates/locations/loading.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["content", "spinkit-rotating-plane", ["loc", [null, [1, 0], [1, 26]]], 0, 0, 0, 0]],
      locals: [],
      templates: []
    };
  })());
});
define("ember-weather/templates/weather", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@2.8.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 5,
            "column": 0
          }
        },
        "moduleName": "ember-weather/templates/weather.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["inline", "weather-current", [], ["weather", ["subexpr", "@mut", [["get", "model", ["loc", [null, [1, 26], [1, 31]]], 0, 0, 0, 0]], [], [], 0, 0], "saved", ["subexpr", "@mut", [["get", "isSavedWeather", ["loc", [null, [2, 24], [2, 38]]], 0, 0, 0, 0]], [], [], 0, 0], "saveLocationHandler", "saveLocation", "removeLocationHandler", "removeLocation"], ["loc", [null, [1, 0], [4, 58]]], 0, 0]],
      locals: [],
      templates: []
    };
  })());
});
define('ember-weather/utils/dasherizer', ['exports'], function (exports) {
  exports['default'] = dasherizer;

  function dasherizer(string) {
    return string.split(', ').join('-').split(' ').join('_').toLowerCase();
  }
});
define('ember-weather/utils/get-json', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = getJSON;

  function getJSON(url) {
    return new _ember['default'].RSVP.Promise(function (resolve, reject) {
      _ember['default'].$.ajax({ // jquery + runloop + promises = fun times
        type: 'GET',
        url: url,
        success: function success(data) {
          _ember['default'].run(null, resolve, data);
        },
        error: function error(err) {
          _ember['default'].run(null, reject, err);
        }
      });
    });
  }
});
define('ember-weather/utils/string-util', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = stringUtil;

  // Mega Hax: TODO: remove on next beta release, straight up copied from /packages/ember-runtime/lib/system/string.js

  var STRING_PARAMETERIZE_REGEXP_1 = /[_|\/|\s]+/g;
  var STRING_PARAMETERIZE_REGEXP_2 = /[^a-z0-9\-]+/gi;
  var STRING_PARAMETERIZE_REGEXP_3 = /[\-]+/g;
  var STRING_PARAMETERIZE_REGEXP_4 = /^-+|-+$/g;

  function stringUtil() {
    if (!_ember['default'].FEATURES.isEnabled("string-parameterize")) {
      /**
        Transforms a string so that it may be used as part of a 'pretty' / SEO friendly URL.
         ```javascript
        'My favorite items.'.parameterize();                        // 'my-favorite-items'
        'action_name'.parameterize();                               // 'action-name'
        '100 ways Ember.js is better than Angular.'.parameterize(); // '100-ways-emberjs-is-better-than-angular'
        ```
         @method parameterize
        @param {String} str The string to parameterize.
        @return {String} the parameterized string.
      */
      _ember['default'].String.parameterize = function (str) {
        return str.replace(STRING_PARAMETERIZE_REGEXP_1, '-') // replace underscores, slashes and spaces with separator
        .replace(STRING_PARAMETERIZE_REGEXP_2, '') // remove non-alphanumeric characters except the separator
        .replace(STRING_PARAMETERIZE_REGEXP_3, '-') // replace multiple occurring separators
        .replace(STRING_PARAMETERIZE_REGEXP_4, '') // trim leading and trailing separators
        .toLowerCase();
      };
    }
  }
});
define('ember-weather/views/locations', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].View.extend({

    didInsertElement: function didInsertElement() {
      this.$().foundation('topbar');
    },

    willDestroyElement: function willDestroyElement() {
      this.$().foundation('topbar', 'off');
    }
  });
});
/* jshint ignore:start */



/* jshint ignore:end */

/* jshint ignore:start */

define('ember-weather/config/environment', ['ember'], function(Ember) {
  var prefix = 'ember-weather';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

/* jshint ignore:end */

/* jshint ignore:start */

if (!runningTests) {
  require("ember-weather/app")["default"].create({"name":"ember-weather","version":"0.0.0+f1b54473"});
}

/* jshint ignore:end */
//# sourceMappingURL=ember-weather.map