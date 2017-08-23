import { moduleForComponent, test } from 'ember-qunit';
import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ember-tutorial-component', 'Integration | Component | ember tutorial component', {
  integration: true,
  // afterEach() {
  //   Ember.run(app, 'destroy')
  // }
});

// test('it renders', function(assert) {
//   // Set any properties with this.set('myProperty', 'value');
//   // Handle any actions with this.on('myAction', function(val) { ... });
//   this.set('config', {
//     data: [
//       {
//         target: '#test1',
//         message: 'First help message goes here. Show some helpful message here.',
//         pointerDirection: 'top',
//         mask: {
//           enabled: false,
//           zIndex: 1000
//         }
//       }
//     ],
//     mask: {
//       enabled: true,
//       zIndex: 100
//     },
//     expiration: {
//       localStorageKey: 'TEST_KEY',
//       duration: 1/60
//     }
//   });
//   this.render(hbs`
//     <div id="test1">First Element</div>
//     {{ember-tutorial-component config=config}}
//   `);
//   assert.equal(Ember.$('.tutorial-component .message').text(), 'First help message goes here. Show some helpful message here.');
//   assert.ok(Ember.$('.tutorial-component .action-menu .skip-btn')[0]);
//   assert.ok(Ember.$('.tutorial-component .action-menu .done-btn')[0]);
//   assert.notOk(Ember.$('.tutorial-component .action-menu .previous-btn')[0]);
//   assert.notOk(Ember.$('.tutorial-component .action-menu .next-btn')[0]);
// });

test('click next', function(assert) {
  this.set('config', {
    data: [
      {
        target: '#test1',
        message: 'First help message goes here. Show some helpful message here.',
        pointerDirection: 'top',
        constraints: {
          constrainedAreaContainer: '#ember-testing'
        },
        mask: {
          enabled: false,
          zIndex: 1000
        }
      },
      {
        target: '#test2',
        message: 'This is the next step. Show some helpful message here.',
        pointerDirection: 'bottom'
      },
      {
        target: '#test3',
        message: 'Final step, hit done to hide. Show some helpful message here.',
        pointerDirection: 'left'
      }
    ],
    mask: {
      enabled: true,
      zIndex: 100
    },
    expiration: {
      localStorageKey: 'TEST_KEY',
      duration: 1/60
    }
  });
  this.render(hbs`
    {{ember-tutorial-component config=config}}
    <div id="test1">First Element</div>
    <div id="test2">Second Element</div>
    <div id="test3">Third Element</div>
  `);
  debugger;

  Ember.run(this, function() {
    debugger;
    this.$('.tutorial-component .default-btn.next-btn').click();
    assert.equal(Ember.$('.tutorial-component .message').text(), 'This is the next step. Show some helpful message here.');
    assert.ok(Ember.$('.tutorial-component .action-menu .skip-btn')[0]);
    assert.notOk(Ember.$('.tutorial-component .action-menu .done-btn')[0]);
    assert.ok(Ember.$('.tutorial-component .action-menu .previous-btn')[0]);
    assert.ok(Ember.$('.tutorial-component .action-menu .next-btn')[0]);
  });

  // debugger;
  // this.$('.tutorial-component .default-btn.next-btn');
  // Ember.run.schedule('afterRender', () => {
  // debugger;
  // assert.equal(Ember.$('.tutorial-component .message').text(), 'This is the next step. Show some helpful message here.');
  // assert.ok(Ember.$('.tutorial-component .action-menu .skip-btn')[0]);
  // assert.notOk(Ember.$('.tutorial-component .action-menu .done-btn')[0]);
  // assert.ok(Ember.$('.tutorial-component .action-menu .previous-btn')[0]);
  // assert.ok(Ember.$('.tutorial-component .action-menu .next-btn')[0]);
  // })
});
