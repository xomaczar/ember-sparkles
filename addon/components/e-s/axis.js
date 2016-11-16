import Ember from 'ember';
import layout from '../../templates/components/e-s/axis';

export default Ember.Component.extend({
  layout,
  tagName: '',
  classNames: ['ember-sparkles--axis'],

  'with-transition': true
});
