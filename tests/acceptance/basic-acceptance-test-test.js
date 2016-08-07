import { test } from 'qunit';
import Ember from 'ember';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | basic acceptance test');

test('visiting /', function(assert) {
  assert.expect(2);
  visit('/');
  andThen(function() {
    assert.equal(Ember.$('.tutorial-component > div')[0].innerHTML, 'First help message goes here. Show some helpful message here.');
    assert.equal(Ember.$('.tutorial-component > button')[0].innerHTML, 'Next');
  });
});
