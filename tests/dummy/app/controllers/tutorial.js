import Ember from 'ember';

export default Ember.Controller.extend({
  config: {
    data: [{
      eleId: 'test1',
      message: 'This is a demo message. May be step 1, please press next.'
    },{
      eleId: 'test2',
      message: 'Message 2'
    },{
      eleId: 'test3',
      message: 'This press next mo message. May be step 1, pleas'
    }]
  }
});