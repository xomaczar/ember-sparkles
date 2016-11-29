import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('e-s/tooltip-content', 'Integration | Component | e s/tooltip content', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{e-s/tooltip-content}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#e-s/tooltip-content}}
      template block text
    {{/e-s/tooltip-content}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
