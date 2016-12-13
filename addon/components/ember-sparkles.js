import Ember from 'ember';
import layout from '../templates/components/ember-sparkles';

const { computed } = Ember;
const { floor } = Math;

const DEFAULT_WIDTH = 960;
const DEFAULT_HEIGHT = 500;

export default Ember.Component.extend({
  layout,
  tagName: 'svg',
  attributeBindings: ['fullSize:width', 'fullSize:height'],

  fullSize: '100%',

  width: DEFAULT_WIDTH,
  height: DEFAULT_HEIGHT,

  marginTop: 20,
  marginRight: 50,
  marginBottom: 30,
  marginLeft: 40,

  resizeService: Ember.inject.service('resize'),
  didInsertElement() {
    this._super(...arguments);
    Ember.run.scheduleOnce('afterRender', this, 'resize');
    this.get('resizeService').on('debouncedDidResize', () => Ember.run.scheduleOnce('afterRender', this, 'resize'));
  },

  resize() {
    let $elem = this.$();
    if (!$elem) {
      return;
    }

    this.set('width', floor($elem.innerWidth()));
    this.set('height', floor($elem.innerHeight()));
  },

  innerWidth: computed('width', 'marginLeft', 'marginRight', function() {
    return this.get('width') - this.get('marginLeft') - this.get('marginRight');
  }),

  innerHeight: computed('height', 'marginTop', 'marginBottom', function() {
    return this.get('height') - this.get('marginTop') - this.get('marginBottom');
  })
});
