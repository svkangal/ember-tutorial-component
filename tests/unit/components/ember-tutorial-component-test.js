import { moduleForComponent, test } from 'ember-qunit';

let component;
moduleForComponent('ember-tutorial-component', 'Unit | Component | ember tutorial component', {
  // Specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar'],
  unit: true,
  beforeEach() {
    component = this.subject({
      config: {
        data: [
          {
            target: '#test1',
            message: 'First help message goes here. Show some helpful message here.',
            pointerDirection: 'top',
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
            message: 'This is the next step. Show some helpful message here.',
            pointerDirection: 'left'
          },
          {
            target: '#test4',
            message: 'Final step, hit done to hide. Show some helpful message here.',
            pointerDirection: 'right'
          }
        ],
        mask: {
          enabled: true,
          zIndex: 100
        }
      }
    });
  }
});

test('test property: currentConfig', function(assert) {
  assert.expect(1);

  assert.deepEqual(component.get('currentConfig'), {
    target: '#test1',
    message: 'First help message goes here. Show some helpful message here.',
    pointerDirection: 'top',
    mask: {
      enabled: false,
      zIndex: 1000
    }
  }, 'currentConfig should start with the first data');
});

test('test property: isEnabledMask', function(assert) {
  assert.expect(1);

  assert.notOk(component.get('isEnabledMask'), 'isEnabledMask should take priority in data config');
});

test('test property: zIndexMask', function(assert) {
  assert.expect(1);

  assert.equal(component.get('zIndexMask'), 1000, 'zIndex should take priority in data config:');
});

test('test property: pointerDirection', function(assert) {
  assert.expect(1);

  assert.equal(component.get('pointerDirection'), 'top', 'should be equal to pointerDirection in data config');
});

test('test property: constrainedAreaContainer', function(assert) {
  assert.expect(1);

  assert.equal(component.get('constrainedAreaContainer'), 'window', 'should default to window');
});

test('test property: scrollableAreaContainer', function(assert) {
  assert.expect(1);

  assert.notOk(component.get('scrollableAreaContainer'), 'should default to window');
});

test('test property: isFirstMessage', function(assert) {
  assert.expect(1);

  assert.ok(component.get('isFirstMessage'), 'should start with first message');
});

test('test property: isLastMessage', function(assert) {
  assert.expect(1);

  assert.notOk(component.get('isLastMessage'), 'first message should not be the last message');
});

test('test property: message', function(assert) {
  assert.expect(1);

  assert.equal(component.get('message'), 'First help message goes here. Show some helpful message here.', 'should equal to message in config');
});

test('test property: positionSettings', function(assert) {
  assert.expect(4);

  assert.deepEqual(component.get('positionSettings'), {
    attachment: 'top center',
    offset: '-10px 0',
    targetAttachment: 'bottom center'
  });

  component.incrementProperty('currentConfigIndex');
  assert.deepEqual(component.get('positionSettings'), {
    attachment: 'bottom center',
    offset: '10px 0',
    targetAttachment: 'top center'
  });

  component.incrementProperty('currentConfigIndex');
  assert.deepEqual(component.get('positionSettings'), {
    attachment: 'middle left',
    offset: '0 -20px',
    targetAttachment: 'middle right'
  });

  component.incrementProperty('currentConfigIndex');
  assert.deepEqual(component.get('positionSettings'), {
    attachment: 'middle right',
    offset: '0 20px',
    targetAttachment: 'middle left'
  });
});

test('test property: defaultTetherSettings', function(assert) {
  assert.expect(1);

  assert.deepEqual(component.get('defaultTetherSettings'), {
    attachment: 'top center',
    constraints: [
      {
        to: 'window'
      }
    ],
    element: undefined,
    offset: '-10px 0',
    target: undefined,
    targetAttachment: 'bottom center'
  });
});

