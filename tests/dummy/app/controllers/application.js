import Ember from 'ember';

export default Ember.Controller.extend({
  config: {
    data: [{
      eleId: 'test1',
      message: 'First help message goes here.'
    }, {
      eleId: 'test2',
      message: 'This is the next step.'
    }, {
      eleId: 'test3',
      message: 'Final step, hit done to hide.'
    }]
  }
});
