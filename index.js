/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-tutorial-component',

  contentFor: function(type, config) {
    if (type === 'body-footer') {
      return '<div id="ember-tutorial-component-wormhole"></div>';
    }
  },
  isDevelopingAddon: function() {
    return true;
  }
};
