/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-tutorial-component',

  included(app) {
    this._super.included(app);
    app.import(app.bowerDirectory + '/tether/dist/js/tether.js');
  },
  contentFor: function(type, config) {
    if (type === 'body-footer') {
      return '<div id="ember-tutorial-component-wormhole"></div><div class="tutorial-component-overlay hide"></div>';
    }
  },
  isDevelopingAddon: function() {
    return true;
  }
};
