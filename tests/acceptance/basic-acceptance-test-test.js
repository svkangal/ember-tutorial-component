import { test } from 'qunit';
import Ember from 'ember';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | basic acceptance test');

test('visiting /', function(assert) {
  assert.expect(3);
  visit('/');
  andThen(function() {
    assert.equal(Ember.$('.tutorial-component > div')[0].innerHTML, 'First help message goes here. Show some helpful message here.');
    assert.equal(Ember.$('.tutorial-component > .action-menu > button')[0].innerHTML, 'Skip');
    assert.equal(Ember.$('.tutorial-component > .action-menu > button')[1].innerHTML, 'Next');
  });
});
