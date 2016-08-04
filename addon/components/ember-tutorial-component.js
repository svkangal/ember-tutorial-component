import Ember from 'ember';
import layout from '../templates/components/ember-tutorial-component';

const { computed, Handlebars: { SafeString } } = Ember;
export default Ember.Component.extend({
  layout: layout,

  config: null,

  currentConfig: null,

  currentConfigIndex: 0,

  hideMessage: false,

  isLastMessage: computed('currentConfigIndex', function() {
    return this.get('currentConfigIndex') === this.get('config').data.length - 1;
  }),

  message: computed('currentConfig', function() {
    if(this.get('currentConfig')){
      return this.get('currentConfig').message;
    }
  }),

  /**
   * Tooltip coord X
   * @property xCoord
   * @type {Number}
   * @default 0
   */
  xCoord: computed('currentConfig', function() {
    if(this.get('currentConfig')) {
      let ele = Ember.$('#'+this.get('currentConfig').eleId);
      if (ele && ele[0]) {
        let rect = ele[0].getBoundingClientRect();
        return rect.right;
      }
    }
  }),

  /**
   * Tooltip coord Y
   * @property yCoord
   * @type {Number}
   * @default 0
   */
  yCoord: computed('currentConfig', function() {
    if(this.get('currentConfig')) {
      let ele = Ember.$('#'+this.get('currentConfig').eleId);
      if (ele && ele[0]) {
        let rect = ele[0].getBoundingClientRect();
        return rect.top;
      } 
    }
  }),

  /**
   * Tooltip CSS inline style
   * @param {Number} xCoord
   * @param {Number} yCoord
   * @method tooltipStyle
   * @return `left: Xpx; top: Ypx;`
   */
  tooltipStyle: computed('xCoord', 'yCoord', function() {
    return new SafeString(`left: ${this.get('xCoord') + 15}px; top: ${this.get('yCoord')}px; position: absolute;`);
  }),


  didReceiveAttrs() {
    this.set('config', {
      data: [{
        eleId: 'test1',
        message: 'This is a demo message. May be step 1, please press next.'
      },{
        eleId: 'test12',
        message: 'Message 2'
      }]
    });
  },

  didInsertElement() {
    let that = this;
    Ember.run.scheduleOnce('afterRender', function() {
      that.set('currentConfig', that.get('config').data[0]);
      that.set('currentConfigIndex', 0);
    });
  },

  actions: {
    next() {
      let nextConfigIndex = this.get('currentConfigIndex') + 1;
      this.set('currentConfig', this.get('config').data[nextConfigIndex]);
      this.set('currentConfigIndex', nextConfigIndex);
      window.scrollTo(this.get('xCoord'), this.get('yCoord'));
    },

    done() {
      this.set('hideMessage', true);
    }
  }

});
