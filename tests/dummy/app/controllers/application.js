import Ember from 'ember';

const config =  {
  data: [{
    target: '#test1',
    message: 'First help message goes here. Show some helpful message here.'
  }, {
    target: '#test2',
    message: 'This is the next step. Show some helpful message here.'
  }, {
    target: '#test3',
    message: 'Final step, hit done to hide. Show some helpful message here. Final step, hit done to hide. Show some helpful message here.Final step, hit done to hide. Show some helpful message here.'
  }, {
    target: '#test4',
    pointerDirection: 'top',
    message: 'show arrow pointer direction to the up.'
  }, {
    target: '#test4',
    pointerDirection: 'right',
    message: 'show arrow pointer direction to the right.'
  }, {
    target: '#test4',
    pointerDirection: 'bottom',
    message: 'show arrow pointer direction to the down.'
  }, {
    target: '#test4',
    pointerDirection: 'left',
    message: 'show arrow pointer direction to the left.'
  }],

  actions: {
    afterDone: function() {
      window.alert('this is left as a hook for developer to implement');
    }
  }
};

export default Ember.Controller.extend({
  config: config,

  actions: {
    new() {
      this.set('config', {
        /* jshint ignore:start */
        ...config,
        /* jshint ignore:end */
        mask: false
      });
    },
    newWithMask() {
      this.set('config', {
        /* jshint ignore:start */
        ...config,
        /* jshint ignore:end */
        mask: true
      });
    }
  }
});
