import Ember from 'ember';

export default Ember.Controller.extend({
  config: {
    data: [{
      ele: '#test1',
      message: 'First help message goes here. Show some helpful message here.'
    }, {
      ele: '#test2',
      message: 'This is the next step. Show some helpful message here.'
    }, {
      ele: '#test3',
      message: 'Final step, hit done to hide. Show some helpful message here. Final step, hit done to hide. Show some helpful message here.Final step, hit done to hide. Show some helpful message here.'
    }, {
      ele: '#test4',
      pointerDirection: 'up',
      message: 'show arrow pointer direction to the up.'
    }, {
      ele: '#test4',
      pointerDirection: 'right',
      message: 'show arrow pointer direction to the right.'
    }, {
      ele: '#test4',
      pointerDirection: 'down',
      message: 'show arrow pointer direction to the down.'
    }, {
      ele: '#test4',
      pointerDirection: 'left',
      message: 'show arrow pointer direction to the left.'
    }]
  },

  actions: {
    new() {
      this.set('config', {
        data: [{
          ele: '#test1',
          message: 'First help message goes here. Show some helpful message here.'
        }, {
          ele: '#test2',
          message: 'This is the next step. Show some helpful message here.'
        }, {
          ele: '#test3',
          message: 'Final step, hit done to hide. Show some helpful message here.'
        }, {
          ele: '#test4',
          pointerDirection: 'up',
          message: 'show arrow pointer direction to the up.'
        }, {
          ele: '#test4',
          pointerDirection: 'right',
          message: 'show arrow pointer direction to the right.'
        }, {
          ele: '#test4',
          pointerDirection: 'down',
          message: 'show arrow pointer direction to the down.'
        }, {
          ele: '#test4',
          pointerDirection: 'left',
          message: 'show arrow pointer direction to the left.'
        }]
      });
    }
  }
});
