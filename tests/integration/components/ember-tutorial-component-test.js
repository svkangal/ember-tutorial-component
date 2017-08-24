import { moduleForComponent, test } from 'ember-qunit';
import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ember-tutorial-component', 'Integration | Component | ember tutorial component', {
  integration: true,
  beforeEach(assert) {
    window.localStorage.removeItem('TEST_KEY');
    this.set('config', {
      data: [
        {
          target: '#test1',
          message: 'First',
          pointerDirection: 'top',
          offset: '0 10px',
          mask: {
            enabled: true,
            zIndex: 1000
          },
          actions: {
            next() {
              assert.ok(true);
            }
          }
        },
        {
          target: '#test2',
          message: 'Second',
          pointerDirection: 'bottom',
          autoScrollOffset: 100,
          actions: {
            next() {
              assert.ok(true);
            },
            previous() {
              assert.ok(true);
            }
          }
        },
        {
          target: '#test3',
          message: 'Third',
          pointerDirection: 'left',
          actions: {
            next() {
              assert.ok(true);
            },
            previous() {
              assert.ok(true);
            }
          }
        },
        {
          target: '#test4',
          message: 'Last',
          pointerDirection: 'right',
          actions: {
            next() {
              assert.ok(true);
            },
            previous() {
              assert.ok(true);
            }
          }
        }
      ],
      expiration: {
        localStorageKey: 'TEST_KEY',
        duration: 1000
      },
      actions: {
        afterDone() {
          assert.ok(true);
        }
      }
    });
    this.render(hbs`
      <div id="test1">First Element</div>
      <div id="test2">First Element</div>
      <div id="test3">First Element</div>
      <div id="test4">First Element</div>
      <div id="ember-tutorial-component-wormhole"></div>
      {{ember-tutorial-component config=config}}
    `);
  },
  afterEach() {
    window.localStorage.removeItem('TEST_KEY');
    Ember.$('.tutorial-component-overlay').addClass('hide');
  }
});

test(`it doesn't render on null config`, function(assert) {
  assert.expect(1);

  this.render(hbs`
    <div id="ember-tutorial-component-wormhole"></div>
    {{ember-tutorial-component}}
  `);
  assert.ok(this.$('.tutorial-component').hasClass('hide'));
});

test('it renders', function(assert) {
  assert.equal(this.$('.tutorial-component .message').text(), 'First');
  assert.ok(this.$('.tutorial-component .action-menu .skip-btn')[0]);
  assert.notOk(this.$('.tutorial-component .action-menu .done-btn')[0]);
  assert.notOk(this.$('.tutorial-component .action-menu .previous-btn')[0]);
  assert.ok(this.$('.tutorial-component .action-menu .next-btn')[0]);
});

test('has mask', function(assert) {
  assert.expect(1);

  assert.ok(Ember.$('.tutorial-component-overlay').css('z-index'), 1000);
});

test('click next', function(assert) {
  assert.expect(20);

  this.$('.tutorial-component .next-btn').click();
  assert.equal(this.$('.tutorial-component .message').text(), 'Second');
  assert.ok(this.$('.tutorial-component .action-menu .skip-btn')[0]);
  assert.notOk(this.$('.tutorial-component .action-menu .done-btn')[0]);
  assert.ok(this.$('.tutorial-component .action-menu .previous-btn')[0]);
  assert.ok(this.$('.tutorial-component .action-menu .next-btn')[0]);

  this.$('.tutorial-component .next-btn').click();
  assert.equal(this.$('.tutorial-component .message').text(), 'Third');
  assert.ok(this.$('.tutorial-component .action-menu .skip-btn')[0]);
  assert.notOk(this.$('.tutorial-component .action-menu .done-btn')[0]);
  assert.ok(this.$('.tutorial-component .action-menu .previous-btn')[0]);
  assert.ok(this.$('.tutorial-component .action-menu .next-btn')[0]);

  this.$('.tutorial-component .next-btn').click();
  assert.equal(this.$('.tutorial-component .message').text(), 'Last');
  assert.ok(this.$('.tutorial-component .action-menu .skip-btn')[0]);
  assert.ok(this.$('.tutorial-component .action-menu .done-btn')[0]);
  assert.ok(this.$('.tutorial-component .action-menu .previous-btn')[0]);
  assert.notOk(this.$('.tutorial-component .action-menu .next-btn')[0]);

  this.$('.tutorial-component .done-btn').click();
  assert.ok(this.$('.tutorial-component').hasClass('hide'));
});

test('click previous', function(assert) {
  assert.expect(25);

  this.$('.tutorial-component .next-btn').click();
  this.$('.tutorial-component .next-btn').click();
  this.$('.tutorial-component .next-btn').click();

  assert.equal(this.$('.tutorial-component .message').text(), 'Last');
  assert.ok(this.$('.tutorial-component .action-menu .skip-btn')[0]);
  assert.ok(this.$('.tutorial-component .action-menu .done-btn')[0]);
  assert.ok(this.$('.tutorial-component .action-menu .previous-btn')[0]);
  assert.notOk(this.$('.tutorial-component .action-menu .next-btn')[0]);

  this.$('.tutorial-component .previous-btn').click();
  assert.equal(this.$('.tutorial-component .message').text(), 'Third');
  assert.ok(this.$('.tutorial-component .action-menu .skip-btn')[0]);
  assert.notOk(this.$('.tutorial-component .action-menu .done-btn')[0]);
  assert.ok(this.$('.tutorial-component .action-menu .previous-btn')[0]);
  assert.ok(this.$('.tutorial-component .action-menu .next-btn')[0]);

  this.$('.tutorial-component .previous-btn').click();
  assert.equal(this.$('.tutorial-component .message').text(), 'Second');
  assert.ok(this.$('.tutorial-component .action-menu .skip-btn')[0]);
  assert.notOk(this.$('.tutorial-component .action-menu .done-btn')[0]);
  assert.ok(this.$('.tutorial-component .action-menu .previous-btn')[0]);
  assert.ok(this.$('.tutorial-component .action-menu .next-btn')[0]);

  this.$('.tutorial-component .previous-btn').click();
  assert.equal(this.$('.tutorial-component .message').text(), 'First');
  assert.ok(this.$('.tutorial-component .action-menu .skip-btn')[0]);
  assert.notOk(this.$('.tutorial-component .action-menu .done-btn')[0]);
  assert.notOk(this.$('.tutorial-component .action-menu .previous-btn')[0]);
  assert.ok(this.$('.tutorial-component .action-menu .next-btn')[0]);
});

test('click skip', function(assert) {
  assert.expect(2);

  this.$('.tutorial-component .skip-btn').click();
  assert.ok(this.$('.tutorial-component').hasClass('hide'));
});

test('hasVisited', function(assert) {
  window.localStorage.setItem('TEST_KEY', JSON.stringify(new Date(new Date().getTime() + 100000)));
  this.render(hbs`
      <div id="test1">First Element</div>
      <div id="test2">First Element</div>
      <div id="test3">First Element</div>
      <div id="test4">First Element</div>
      <div id="ember-tutorial-component-wormhole"></div>
      {{ember-tutorial-component config=config}}
    `);
  assert.ok(this.$('.tutorial-component').hasClass('hide'));
});
