/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-tutorial-component',

  contentFor: function(type, config) {
    if (config.environment !== 'test' && type === 'body-footer') {
      return '<div id="ember-tutorial-component-wormhole"></div>';
    }
  }
};
