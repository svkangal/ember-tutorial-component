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
   * @property isLastMessage
   * @type {Boolean}
   */
  isLastMessage: computed('currentConfigIndex', function() {
    return this.get('currentConfigIndex') === this.get('config').data.length - 1;
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
      let ele = Ember.$('#'+this.get('currentConfig').eleId);
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
      let ele = Ember.$('#'+this.get('currentConfig').eleId);
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
    return new SafeString(`left: ${this.get('xCoord') + 15}px; top: ${this.get('yCoord')}px; position: absolute;`);
  }),

  /**
   * @method didInsertElement
   */
  didInsertElement() {
    //let that = this;
    run.scheduleOnce('afterRender', this, function() {
      this.set('currentConfig', this.get('config').data[0]);
      this.set('currentConfigIndex', 0);
      this.computeXCord();
      this.computeYCord();
    });
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
      this.set('currentConfig', this.get('config').data[nextConfigIndex]);
      this.set('currentConfigIndex', nextConfigIndex);
      run.scheduleOnce('afterRender', this, function() {
        this.computeXCord();
        this.computeYCord();
        window.scrollTo(this.get('xCoord'), this.get('yCoord'));
      });
    },
    /**
     * @method  done
     */
    done() {
      this.set('hideMessage', true);
    }
  }

});
