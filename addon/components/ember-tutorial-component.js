import Ember from 'ember';
import layout from '../templates/components/ember-tutorial-component';

const { computed, run, isEmpty, observer } = Ember;
/**
 *
 * Usage:
 *
 *    Basic Usage with default template:
 *      {{ember-tutorial-component config=config}}
 *
 *    Supported Attributes:
 *    config : Configuration object with data.
 *
 * @class EmberTutorialComponent
 * @extend Ember.Component
 */
export default Ember.Component.extend({
  /**
   * @property layout
   * @type {Object}
   */
  layout: layout,
  /**
   * @config layout
   * @type {Object}
   */
  config: null,
  /**
   * @object currentConfig
   * @type {Object}
   */
  currentConfig: null,
  /**
   * @property currentConfigIndex
   * @type {Number}
   */
  currentConfigIndex: 0,
  /**
   * @property hideMessage
   * @type {Boolean}
   */
  hideMessage: true,
  /**
   * @property tetherObject
   * @type {Object}
   */
  tetherObject: null,
  /**
   * @property pointerDirection
   * @type {String}
   */
  pointerDirection: null,

  /**
   * @property defaultTetherSettings
   * @type {Object}
   */
  defaultTetherSettings: computed('currentConfig', 'positionSettings', function() {
    let constrainedAreaContainer = this.get('constrainedAreaContainer');
    return {
      element: Ember.$('.tutorial-component')[0],
      target: Ember.$(this.get('currentConfig.ele'))[0],
      offset: this.get('positionSettings.offset'),
      attachment: this.get('positionSettings.attachment'),
      targetAttachment: this.get('positionSettings.targetAttachment'),
      constraints: [
        {
          to: constrainedAreaContainer === 'window' ? 'window' : Ember.$(constrainedAreaContainer)[0],
          // attachment: 'together'
        }
      ]
    };
  }),

  /**
   * @property positionSettings
   * @type {Object}
   */
  positionSettings: computed('currentConfig', 'pointerDirection', function() {
    let pointerDirection = this.get('pointerDirection');
    let attachment;
    let targetAttachment;
    let offset;
    switch (pointerDirection) {
      case 'top':
        attachment = 'top center';
        targetAttachment = 'bottom center';
        offset = '-10px 0';
        break;
      case 'bottom':
        attachment = 'bottom center';
        targetAttachment = 'top center';
        offset = '10px 0';
        break;
      case 'left':
        attachment = 'middle left';
        targetAttachment = 'middle right';
        offset = '0 -20px';
        break;
      case 'right':
        attachment = 'middle right';
        targetAttachment = 'middle left';
        offset = '0 20px';
        break;
      default:
        attachment = 'bottom center';
        targetAttachment = 'top center';
        offset = '10px 0';
    }
    let configOffset = this.get('currentConfig.offset');
    offset = configOffset ? configOffset : offset;
    return { attachment, targetAttachment, offset };
  }),

  /**
   * Observer on pointerDirection
   */
  pointerDirectionObserver: observer('currentConfig.pointerDirection', function() {
    let pointerDirection = this.get('currentConfig.pointerDirection');
    if (pointerDirection) {
      this.set('pointerDirection', pointerDirection);
    } else {
      this.set('pointerDirection', 'bottom');
    }
  }),

  /**
   * CSS Selector for specified constrainedAreaContainer in config
   * @property constrainedAreaContainer
   * @type {String}
   */
  constrainedAreaContainer: computed('currentConfig.constraints', function() {
    return this.getWithDefault('currentConfig.constraints.constrainedAreaContainer', 'window');
  }),

  /**
   * CSS Selector for specified scrollableContainer in config
   * @property scrollableContainer
   * @type {String}
   */
  scrollableContainer: computed('currentConfig.constraints', function() {
    return this.getWithDefault('currentConfig.constraints.scrollableContainer', 'window');
  }),

  /**
   * @property isLastMessage
   * @type {Boolean}
   */
  isLastMessage: computed('currentConfigIndex', function() {
    if (this.get('config')) {
      return this.get('currentConfigIndex') === this.get('config').data.length - 1;
    } else {
      return false;
    }
  }),

  /**
   * @property isFirstMessage
   * @type {Boolean}
   */
  isFirstMessage: computed('currentConfigIndex', function() {
    if (this.get('config')) {
      return this.get('currentConfigIndex') === 0;
    } else {
      return false;
    }
  }),

  /**
   * @property message
   * @type {String}
   */
  message: computed('currentConfig', function() {
    if (this.get('currentConfig')) {
      return this.get('currentConfig').message;
    }
  }),

  /**
   * Ember hook to initialize the tooltip for the first time
   * @method didInsertElement
   */
  didInsertElement() {
    if (this.get('config')) {
      this.set('currentConfig', this.get('config').data[0]);
      run.schedule('afterRender', this, function() {
        this.initTooltip();
        this.recalculatePosition();
        this.scrollToElement();
        this.set('hideMessage', false);
      });
    } else {
      this.set('hideMessage', true);
    }
  },

  /**
   * Initialize the tooltip
   * @method initTooltip
   */
  initTooltip() {
    this.set('currentConfigIndex', 0);

    let defaultTetherSettings = this.get('defaultTetherSettings');
    let newTetherObject = new Tether(defaultTetherSettings);
    run.scheduleOnce('afterRender', this, function() {
      newTetherObject.position();
    });
    this.set('tetherObject', newTetherObject);
  },


  /**
   * Update internal properties to reflect new current configuration and re-position.
   * @method  updateConfigDetails
   */
  updateConfigDetails(nextConfigIndex) {
    this.set('currentConfig', this.get('config').data[nextConfigIndex]);
    this.set('currentConfigIndex', nextConfigIndex);
    run.schedule('afterRender', this, function() {
      this.setPosition();
      this.recalculatePosition();
      this.scrollToElement();
    });
  },

  /**
   * Set the position of the message box by overwriting Tether config
   * @method setPosition
   */
  setPosition() {
    this.get('tetherObject').setOptions(this.get('defaultTetherSettings'));
  },

  /**
   * Recalculate the position of the message box in case it overflows.
   * Only triggered when pointerDirection is not specified.
   * @method recalculatePosition
   */
  recalculatePosition() {
    if (isEmpty(this.get('currentConfig.pointerDirection'))) {
      let className = Ember.$('.tutorial-component')[0].className;
      let directionArray = ['left', 'right', 'top', 'bottom'];
      directionArray.forEach(direction => {
        if (className.indexOf(`tether-out-of-bounds-${direction}`) !== -1) {
          this.set('pointerDirection', direction);
          this.setPosition();
          return;
        }
      });
    }
  },

  /**
   * Scroll the page to the position where the message box is
   * @method scrollToElement
   */
  scrollToElement() {
    let autoScrollOffset = this._getAutoScrollOffset();
    let scrollableContainer = this.get('scrollableContainer');
    Ember.$(scrollableContainer).animate({
      scrollTop: this._getOffsetTop() - autoScrollOffset
    }, 1000);
  },

  /**
   * Private method to iteratively calculate height of the current element
   * from the scrollableContainer
   * @method _getOffsetTop
   */
  _getOffsetTop() {
    var targetSelector = this.get('scrollableContainer');
    var $targetParent = Ember.$(targetSelector);
    var currSelector = this.get('currentConfig.ele');
    var $curr = Ember.$(currSelector);
    var TOP = 0;
    var LEFT = 0;
    while (!$curr.is($targetParent)) {
      TOP += $curr[0].offsetTop;
      LEFT += $curr.position().left;
      $curr = $curr.offsetParent();
    }
    return TOP;
  },

  /**
   * Private method to get the default offset when scrolling an element into the page
   * @method _getAutoScrollOffset
   */
  _getAutoScrollOffset() {
    let autoScrollOffset = this.get('currentConfig.autoScrollOffset');
    let offsetSettings = this.get('currentConfig.offset');
    if (!isEmpty(autoScrollOffset)) {
      return autoScrollOffset;
    }
    autoScrollOffset = 0;
    if (!isEmpty(offsetSettings)) {
      autoScrollOffset = this._getVerticalOffset(offsetSettings);
    }
    let messageBoxHeight = Ember.$('.tutorial-component').outerHeight();
    let padding = 20;
    switch (this.get('pointerDirection')) {
      case 'bottom':
        autoScrollOffset += messageBoxHeight + padding;
        break;
      case 'top':
        break;
      case 'left':
      case 'right':
        autoScrollOffset += messageBoxHeight / 2.0 + padding;
        break;
    }
    return autoScrollOffset + padding;
  },

  /**
   * Private method to parse the value of vertical offset
   * @param {String} offset Tether offset property
   */
  _getVerticalOffset(offset) {
    return +offset.split(' ')[0].slice(0, -2);
  },

  /**
   * @property actions
   * @type {Object}
   */
  actions: {
    /**
     * @method next
     */
    next() {
      let nextConfigIndex = this.get('currentConfigIndex') + 1;
      let nextHook = this.get('currentConfig.actions.next');
      this.updateConfigDetails(nextConfigIndex);
      if (typeof nextHook === 'function') {
        nextHook();
      }
    },

    /**
     * @method  done
     */
    done() {
      const afterDone = this.get('config.actions.afterDone');
      if (typeof afterDone === 'function') {
        afterDone();
      }
      this.set('hideMessage', true);
      this.set('config', null);
    },

    /**
     * @method skip
     */
    skip() {
      this.send('done');
    },

    previous() {
      let nextConfigIndex = this.get('currentConfigIndex') - 1;
      let previousHook = this.get('currentConfig.actions.previous');
      this.updateConfigDetails(nextConfigIndex);
      if (typeof previousHook === 'function') {
        previousHook();
      }
    }
  }
});
