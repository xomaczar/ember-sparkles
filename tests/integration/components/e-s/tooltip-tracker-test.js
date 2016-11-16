import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('e-s/tooltip-tracker', 'Integration | Component | e s/tooltip tracker', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{e-s/tooltip-tracker}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#e-s/tooltip-tracker}}
      template block text
    {{/e-s/tooltip-tracker}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
