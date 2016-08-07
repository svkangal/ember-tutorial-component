import { moduleForComponent, test } from 'ember-qunit';
import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ember-tutorial-component', 'Integration | Component | ember tutorial component', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  this.set('config', {
    data: [{
      eleId: 'test1',
      message: 'First help message goes here. Show some helpful message here.'
    }, {
      eleId: 'test2',
      message: 'This is the next step. Show some helpful message here.'
    }, {
      eleId: 'test3',
      message: 'Final step, hit done to hide. Show some helpful message here.'
    }]
  });
  this.render(hbs`<div id="test1">Firt Element</div>
    <div id="test2">Second Element</div>
    <div id="test3">Last Element</div>
    {{ember-tutorial-component config=config}}`);
  assert.equal(Ember.$('.tutorial-component > div')[0].innerHTML, 'First help message goes here. Show some helpful message here.');
  Ember.$('.tutorial-component > button').click();
});
