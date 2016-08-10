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
      message: 'Final step, hit done to hide. Show some helpful message here.'
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
        }]
      });
    }
  }
});
