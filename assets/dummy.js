"use strict";

/* jshint ignore:start */



/* jshint ignore:end */

define('dummy/app', ['exports', 'ember', 'dummy/resolver', 'ember-load-initializers', 'dummy/config/environment'], function (exports, _ember, _dummyResolver, _emberLoadInitializers, _dummyConfigEnvironment) {

  var App = undefined;

  _ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = _ember['default'].Application.extend({
    modulePrefix: _dummyConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _dummyConfigEnvironment['default'].podModulePrefix,
    Resolver: _dummyResolver['default']
  });

  (0, _emberLoadInitializers['default'])(App, _dummyConfigEnvironment['default'].modulePrefix);

  exports['default'] = App;
});
define('dummy/components/app-version', ['exports', 'ember-cli-app-version/components/app-version', 'dummy/config/environment'], function (exports, _emberCliAppVersionComponentsAppVersion, _dummyConfigEnvironment) {

  var name = _dummyConfigEnvironment['default'].APP.name;
  var version = _dummyConfigEnvironment['default'].APP.version;

  exports['default'] = _emberCliAppVersionComponentsAppVersion['default'].extend({
    version: version,
    name: name
  });
});
define('dummy/components/ember-tutorial-component', ['exports', 'ember-tutorial-component/components/ember-tutorial-component'], function (exports, _emberTutorialComponentComponentsEmberTutorialComponent) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberTutorialComponentComponentsEmberTutorialComponent['default'];
    }
  });
});
define('dummy/components/ember-wormhole', ['exports', 'ember-wormhole/components/ember-wormhole'], function (exports, _emberWormholeComponentsEmberWormhole) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberWormholeComponentsEmberWormhole['default'];
    }
  });
});
define('dummy/controllers/tutorial', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    config: {
      data: [{
        eleId: 'test1',
        message: 'First help message goes here.'
      }, {
        eleId: 'test2',
        message: 'This is the next step.'
      }, {
        eleId: 'test3',
        message: 'Final step, hit done to hide.'
      }]
    }
  });
});
define('dummy/ember-tutorial-component/tests/modules/ember-tutorial-component/components/ember-tutorial-component.jshint', ['exports'], function (exports) {
  QUnit.module('JSHint | modules/ember-tutorial-component/components/ember-tutorial-component.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'modules/ember-tutorial-component/components/ember-tutorial-component.js should pass jshint.');
  });
});
define('dummy/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _emberInflectorLibHelpersPluralize) {
  exports['default'] = _emberInflectorLibHelpersPluralize['default'];
});
define('dummy/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _emberInflectorLibHelpersSingularize) {
  exports['default'] = _emberInflectorLibHelpersSingularize['default'];
});
define('dummy/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'dummy/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _dummyConfigEnvironment) {
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(_dummyConfigEnvironment['default'].APP.name, _dummyConfigEnvironment['default'].APP.version)
  };
});
define('dummy/initializers/container-debug-adapter', ['exports', 'ember-resolver/container-debug-adapter'], function (exports, _emberResolverContainerDebugAdapter) {
  exports['default'] = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _emberResolverContainerDebugAdapter['default']);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('dummy/initializers/data-adapter', ['exports', 'ember'], function (exports, _ember) {

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
define('dummy/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data/-private/core'], function (exports, _emberDataSetupContainer, _emberDataPrivateCore) {

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
define('dummy/initializers/export-application-global', ['exports', 'ember', 'dummy/config/environment'], function (exports, _ember, _dummyConfigEnvironment) {
  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_dummyConfigEnvironment['default'].exportApplicationGlobal !== false) {
      var value = _dummyConfigEnvironment['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember['default'].String.classify(_dummyConfigEnvironment['default'].modulePrefix);
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
define('dummy/initializers/injectStore', ['exports', 'ember'], function (exports, _ember) {

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
define('dummy/initializers/store', ['exports', 'ember'], function (exports, _ember) {

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
define('dummy/initializers/transforms', ['exports', 'ember'], function (exports, _ember) {

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
define("dummy/instance-initializers/ember-data", ["exports", "ember-data/-private/instance-initializers/initialize-store-service"], function (exports, _emberDataPrivateInstanceInitializersInitializeStoreService) {
  exports["default"] = {
    name: "ember-data",
    initialize: _emberDataPrivateInstanceInitializersInitializeStoreService["default"]
  };
});
define('dummy/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  exports['default'] = _emberResolver['default'];
});
define('dummy/router', ['exports', 'ember', 'dummy/config/environment'], function (exports, _ember, _dummyConfigEnvironment) {

  var Router = _ember['default'].Router.extend({
    location: _dummyConfigEnvironment['default'].locationType,
    rootURL: _dummyConfigEnvironment['default'].rootURL
  });

  Router.map(function () {
    this.route('tutorial');
  });

  exports['default'] = Router;
});
define('dummy/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _emberAjaxServicesAjax) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberAjaxServicesAjax['default'];
    }
  });
});
define("dummy/templates/tutorial", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@2.7.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 60,
            "column": 6
          }
        },
        "moduleName": "dummy/templates/tutorial.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        var el2 = dom.createTextNode("\n ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("h1");
        var el3 = dom.createTextNode("Deinde disputat, quod cuiusque generis animantium statui deceat extremum.");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createTextNode("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Immo videri fortasse. An potest, inquit ille, quicquam esse suavius quam nihil dolere? Duo Reges: constructio interrete. Comprehensum, quod cognitum non habet? ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("a");
        dom.setAttribute(el3, "id", "test1");
        dom.setAttribute(el3, "href", "http://loripsum.net/");
        dom.setAttribute(el3, "target", "_blank");
        var el4 = dom.createTextNode("Paria sunt igitur.");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(" Est enim effectrix multarum et magnarum voluptatum. Itaque contra est, ac dicitis; Nam Pyrrho, Aristo, Erillus iam diu abiecti. ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createTextNode("Idem iste, inquam, de voluptate quid sentit? Id enim natura desiderat. ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("a");
        dom.setAttribute(el3, "href", "http://loripsum.net/");
        dom.setAttribute(el3, "target", "_blank");
        var el4 = dom.createTextNode("At enim hic etiam dolore.");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(" Sin kakan malitiam dixisses, ad aliud nos unum certum vitium consuetudo Latina traduceret. ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("dl");
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("dt");
        var el4 = dom.createElement("dfn");
        var el5 = dom.createTextNode("Efficiens dici potest.");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("dd");
        var el4 = dom.createTextNode("At ille non pertimuit saneque fidenter: Istis quidem ipsis verbis, inquit;");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("dt");
        var el4 = dom.createElement("dfn");
        var el5 = dom.createTextNode("Equidem e Cn.");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("dd");
        var el4 = dom.createTextNode("Fortasse id optimum, sed ubi illud: Plus semper voluptatis?");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("dt");
        var el4 = dom.createElement("dfn");
        var el5 = dom.createTextNode("Primum divisit ineleganter;");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("dd");
        var el4 = dom.createTextNode("Satisne vobis videor pro meo iure in vestris auribus commentatus?");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("dt");
        var el4 = dom.createElement("dfn");
        var el5 = dom.createTextNode("Etiam beatissimum?");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("dd");
        var el4 = dom.createTextNode("Sequitur disserendi ratio cognitioque naturae;");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("pre");
        var el3 = dom.createTextNode("\n    In omni enim arte vel studio vel quavis scientia vel in ipsa\n    virtute optimum quidque rarissimum est.\n\n    Ita ceterorum sententiis semotis relinquitur non mihi cum\n    Torquato, sed virtuti cum voluptate certatio.\n    ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createElement("code");
        var el4 = dom.createTextNode("Quod cum dixissent, ille contra.");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(" Qui-vere falsone, quaerere mittimus-dicitur oculis se privasse; ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("i");
        var el4 = dom.createTextNode("Illa tamen simplicia, vestra versuta.");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(" Quam ob rem tandem, inquit, non satisfacit? Potius ergo illa dicantur: turpe esse, viri non esse debilitari dolore, frangi, succumbere. ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("blockquote");
        dom.setAttribute(el2, "cite", "http://loripsum.net");
        var el3 = dom.createTextNode("\n        Posuisti etiam dicere alios foedus quoddam inter se facere sapientis, ut, quem ad modum sint in se ipsos animati, eodem modo sint erga amicos;\n    ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createTextNode("Sed haec quidem liberius ab eo dicuntur et saepius. Profectus in exilium Tubulus statim nec respondere ausus; ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("a");
        dom.setAttribute(el3, "href", "http://loripsum.net/");
        dom.setAttribute(el3, "target", "_blank");
        var el4 = dom.createTextNode("Restinguet citius, si ardentem acceperit.");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(" Ita nemo beato beatior. Cum ageremus, inquit, vitae beatum et eundem supremum diem, scribebamus haec. ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("i");
        var el4 = dom.createTextNode("Summae mihi videtur inscitiae.");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(" ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("i");
        var el4 = dom.createTextNode("Sed plane dicit quod intellegit.");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(" Quorum sine causa fieri nihil putandum est. ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createElement("a");
        dom.setAttribute(el3, "href", "http://loripsum.net/");
        dom.setAttribute(el3, "target", "_blank");
        dom.setAttribute(el3, "id", "test2");
        var el4 = dom.createTextNode("Sed ille, ut dixi, vitiose.");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(" Ergo hoc quidem apparet, nos ad agendum esse natos. Sic enim maiores nostri labores non fugiendos tristissimo tamen verbo aerumnas etiam in deo nominaverunt. Quamquam tu hanc copiosiorem etiam soles dicere. Ergo hoc quidem apparet, nos ad agendum esse natos. Sic enim maiores Ergo hoc quidem apparet, nos ad agendum esse natos. Sic enim maiores asd  asd  eess  asd no.");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("a");
        dom.setAttribute(el3, "href", "http://loripsum.net/");
        dom.setAttribute(el3, "target", "_blank");
        dom.setAttribute(el3, "id", "test3");
        var el4 = dom.createTextNode("Confecta res esset.");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(" Mihi enim erit isdem istis fortasse iam utendum. Dolor ergo, id est summum malum, metuetur semper, etiamsi non aderit; Tum mihi Piso: Quid ergo? Tu enim ista lenius, hic Stoicorum more nos vexat. Ita enim vivunt quidam, ut eorum vita refellatur oratio. ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("ol");
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createTextNode("Quis est, qui non oderit libidinosam, protervam adolescentiam?");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createTextNode("Tum Piso: Atqui, Cicero, inquit, ista studia, si ad imitandos summos viros spectant, ingeniosorum sunt;");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createTextNode("Re mihi non aeque satisfacit, et quidem locis pluribus.");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createTextNode("Non igitur de improbo, sed de callido improbo quaerimus, qualis Q.");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("ul");
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createTextNode("Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta?");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createTextNode("An vero displicuit ea, quae tributa est animi virtutibus tanta praestantia?");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createTextNode("Te enim iudicem aequum puto, modo quae dicat ille bene noris.");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createTextNode("Sed mehercule pergrata mihi oratio tua.");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createTextNode("Tum ille timide vel potius verecunde: Facio, inquit.");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createTextNode("Superiores tres erant, quae esse possent, quarum est una sola defensa, eaque vehementer.");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0]), 1, 1);
        return morphs;
      },
      statements: [["inline", "ember-tutorial-component", [], ["config", ["subexpr", "@mut", [["get", "config", ["loc", [null, [2, 36], [2, 42]]], 0, 0, 0, 0]], [], [], 0, 0]], ["loc", [null, [2, 2], [3, 4]]], 0, 0]],
      locals: [],
      templates: []
    };
  })());
});
/* jshint ignore:start */



/* jshint ignore:end */

/* jshint ignore:start */

define('dummy/config/environment', ['ember'], function(Ember) {
  var prefix = 'dummy';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

/* jshint ignore:end */

/* jshint ignore:start */

if (!runningTests) {
  require("dummy/app")["default"].create({"name":"ember-tutorial-component","version":"0.0.3+27357fb2"});
}

/* jshint ignore:end */
//# sourceMappingURL=dummy.map