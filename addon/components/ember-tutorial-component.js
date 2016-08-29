import Ember from 'ember';
import layout from '../templates/components/ember-tutorial-component';

const { computed, run, Handlebars: { SafeString } } = Ember;
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
  hideMessage: false,
  /**
   * @property tooltipPointerSide
   * @type {String}
   */
  tooltipPointerSide: 'left',

  /**
   * Tooltip coord X
   * @property xCoord
   * @type {Number}
   * @default 0
   */
  xCoord: 0,

  /**
   * Tooltip coord Y
   * @property yCoord
   * @type {Number}
   * @default 0
   */
  yCoord: 0,

  /**
   * @property isLeftPointer
   * @type {String}
   */
  isLeftPointer: computed.equal('tooltipPointerSide', 'left'),

  /**
   * @property pointerDirection
   * @type {String}
   */
  pointerDirection: computed('currentConfig', 'isLeftPointer', function(){
    if (this.get('currentConfig').pointerDirection) {
      return this.get('currentConfig').pointerDirection;
    } else {
      return this.get('isLeftPointer') ? 'left' : 'right';
    }
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
   * @method computeXCord
   */
  computeXCord() {
    if (this.get('currentConfig')) {
      let ele = Ember.$(this.get('currentConfig').ele);
      if (ele && ele[0]) {
        let { left, right } = ele[0].getBoundingClientRect();
        let { clientWidth: viewPortWidth } = document.documentElement;
        let minTooltipWidth = 200;
        let paddingAndPointerOffset = 32;
        let { width: currentTooltipWidth } = Ember.$('.tutorial-component')[0].getBoundingClientRect();
        if (left < viewPortWidth/2  && right < viewPortWidth/2) { // content in the left half
          this.set('tooltipPointerSide', 'left');
          this.set('xCoord', right);
        } else if (left > viewPortWidth/2  && right < viewPortWidth) { // content in the right half
          this.set('tooltipPointerSide', 'right');
          this.set('xCoord', left - currentTooltipWidth - paddingAndPointerOffset);
        } else if (left > viewPortWidth/2  && right > viewPortWidth) { // content in the right half
          this.set('tooltipPointerSide', 'right');
          this.set('xCoord', left - currentTooltipWidth - paddingAndPointerOffset);
        } else if (left < viewPortWidth/2 && right > viewPortWidth/2) { // content overlapping both hakd
          this.set('tooltipPointerSide', 'left');
          if (right + minTooltipWidth > viewPortWidth) {
            this.set('xCoord', right - 40 - minTooltipWidth);
          } else {
            this.set('xCoord', right);
          }
        } else { // tooltip on the left side
          Ember.Logger.error('This condition should not reach');
        }
      }
    }
  },

  /**
   * @method computeYCord
   */
  computeYCord() {
    if (this.get('currentConfig')) {
      let ele = Ember.$(this.get('currentConfig').ele);
      if (ele && ele[0]) {
        let { top, height } = ele[0].getBoundingClientRect();
        let { height: currentTooltipHeight } = Ember.$('.tutorial-component')[0].getBoundingClientRect();
        let paddingOffset = 0;
        currentTooltipHeight = currentTooltipHeight + paddingOffset;
        if (height < currentTooltipHeight) {
          this.set('yCoord', top + height/2 - currentTooltipHeight/2 +  window.pageYOffset);
        } else {
          this.set('yCoord', top - currentTooltipHeight/2 +  window.pageYOffset);
        }
      }
    }
  },

  /**
   * Tooltip CSS inline style
   * @param {Number} xCoord
   * @param {Number} yCoord
   * @method tooltipStyle
   * @return `left: Xpx; top: Ypx;`
   */
  tooltipStyle:  computed('xCoord', 'yCoord', function() {
    return new SafeString(`left: ${this.get('xCoord')}px; top: ${this.get('yCoord')}px; position: absolute;`);
  }),

  /**
   * Initialize the tooltip
   * @method initTooltip
   */
  initTooltip() {
    this.set('currentConfigIndex', 0);
    this.setPosition();
  },

  /**
   * Overrides the init function
   */
  init() {
    this._super(...arguments);

    Ember.$(window).on('resize.tutorial-component', function() {
      console.log('resize position and trigger setPosition');
      this.setPosition();
    }.bind(this));
  },

  /**
   * Ember Hook used to evit event listeners
   * @method didDestroyElement
   */
  didDestroyElement() {
    console.log('resize position and trigger setPosition');
    this.cancelAutoResize();
  },

  /**
   * Ember Hook used to fetch any new data needed
   * for the component
   * @method didReceiveAttrs
   */
  didReceiveAttrs() {

    if (this.get('config')) {
      this.set('hideMessage', false);
      this.set('currentConfig', this.get('config').data[0]);
      run.schedule('afterRender', this, function() {
        this.initTooltip();
      });
    } else {
      this.set('hideMessage', true);
    }
  },

  /**
   * @method turn off resize listeners
   */
  cancelAutoResize() {
    console.log('cancelAutoResize');
    Ember.$(window).off('resize.tutorial-component');
  },

  /**
   * @method  updateConfigDetails
   */
  updateConfigDetails(nextConfigIndex) {
    this.set('currentConfig', this.get('config').data[nextConfigIndex]);
    this.set('currentConfigIndex', nextConfigIndex);
    run.scheduleOnce('afterRender', this, function() {
      this.setPosition();
      window.scrollTo(this.get('xCoord'), this.get('yCoord'));
    });
  },

  /**
   * Dynamically calculate the border width of given element
   * @param  {String} element
   * @param  {String} pseudoElement
   * @return {Number}                 the border width in px
   */
  getBorderWidth(elementSelector='.tutorial-component', pseudoElementSelector=':before') {
    const properties = ['border-top-width', 'border-left-width', 'border-right-width', 'border-bottom-width'];
    const borderWidths = properties.map((property) => {
        const borderWidth = window.getComputedStyle(document.querySelector('.tutorial-component'), pseudoElementSelector).getPropertyValue(property);
        return parseInt(borderWidth);
    });

    const maxBorderWidth = Math.max.apply(null, borderWidths);
    return maxBorderWidth;
  },

  /**
  * Either call
  * 1) computeXYCord, or
  * 2) computeXCord and computeYCord separately
  * Based on the given pointer direction.
  * If pointerDirection's given, call computerXYCord
  * otherwise call computeXCord and computeYCord
  */
  setPosition() {
    if (this.get('currentConfig').pointerDirection) {
      this.computeXYCord();
    } else {
      this.computeXCord();
      this.computeYCord();
    }
  },

  computeXYCord(tooltipElementSelector='.tutorial-component') {
    let $mainElement = Ember.$(this.get('currentConfig').ele);
    let $tooltipElement = Ember.$(tooltipElementSelector);
    const borderWidth = this.getBorderWidth(tooltipElementSelector);

    let {width: TW, height: TH} = $tooltipElement[0].getBoundingClientRect();
    let {width: W, height: H} = $mainElement[0].getBoundingClientRect();
    let {left: X, top: Y} = $mainElement.offset();

    let x, y, widthSign, heightSign;
    if (W >= TW) {
      widthSign = 1;
    } else {
      widthSign = -1;
    }

    if (H >= TH) {
      heightSign = 1;
    } else {
      heightSign = -1;
    }

    const position = this.get('pointerDirection').toLowerCase();
    switch(position) {
      case 'left':
        x = X + W + borderWidth;
        y = Y + (Math.abs((H-TH)/2.0) * heightSign);
        break;
      case 'right':
        x = X - TW - borderWidth;
        y = Y + (Math.abs((H-TH)/2.0) * heightSign);
        break;
      case 'up':
        x = X + (Math.abs((W-TW)/2.0) * widthSign);
        y = Y + H + borderWidth;
        break;
      case 'down':
        x = X + (Math.abs((W-TW)/2.0) * widthSign);
        y = Y - TH - borderWidth;
        break;
      default:
        Ember.Logger.error('This condition should not reach');
    }

    this.set('xCoord', x);
    this.set('yCoord', y);
  },

  didInsertElement() {
    this.setPosition();
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
      this.updateConfigDetails(nextConfigIndex);
    },
    /**
     * @method  done
     */
    done() {
      this.set('hideMessage', true);
    },

    /**
     * @method skip
     */
    skip() {
      this.set('config', null);
      this.set('hideMessage', true);
    },

    previous() {
      let nextConfigIndex = this.get('currentConfigIndex') - 1;
      this.updateConfigDetails(nextConfigIndex);
    }
  }

});
