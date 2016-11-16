import Ember from 'ember';
import layout from '../../templates/components/e-s/tooltip-tracker';
import { scheduleOnce } from 'ember-runloop';
import { mouse, select } from 'd3-selection';
import { bisectLeft, merge, extent } from 'd3-array';
import { not, and } from 'ember-computed';

const {
  computed
} = Ember;


const TooltipTracker =  Ember.Component.extend({
  layout,
  classNames: ['plot-tracker'],
  tagName: 'g',

  xScale: null,
  xPosition: 0,
  isInactive: not('isActive').readOnly(),
  isActive: and('isMouseOver', 'xValueMatched').readOnly(),

  _setupHandlers() {
    this.selection
      .on('mouseover touchstart', () => this.set('isMouseOver', true))
      .on('mouseout', () => this.set('isMouseOver', false))
      .on('mousemove touchmove', () => this.handleMouseMove())
  },

  didInsertElement() {
    this._super(...arguments);
    this.selection = select(this.element);
    scheduleOnce('afterRender', this, this._setupHandlers);
  },

  willDestroyElement() {
    this._super(...arguments);
    this.selection.on('mouseover mouseout mousemove touchstart touchmove', null);
  },

  xValueMatched: computed('xDataValuesRange', 'xValue', function() {
    let [min, max] = this.get('xDataValuesRange');
    return this.get('xValue') >= min && this.get('xValue') <= max;
  }).readOnly(),

  xDataValuesRange: computed('data.[]', 'inputKey', function() {
    let inputKeyFunc = this.get('inputKey');
    let data = this.get('data');

    let mergeData = merge(data.mapBy('data'));
    return extent(mergeData.map(inputKeyFunc));
  }).readOnly(),

  handleMouseMove() {
    let attrs = this.getProperties('element', 'xScale', 'xValues', 'domain');
    let mouseX = attrs.xScale.invert(mouse(attrs.element)[0]);
    let i = bisectLeft(attrs.xValues, mouseX, 1);
    let x0 = attrs.xValues[i-1];
    let x1 = attrs.xValues[i];
    let xValue = mouseX - x0 > x1 - mouseX ? x1 : x0;
    this.setProperties({
      xPosition: attrs.xScale(xValue),
      xValue : xValue.valueOf()
    })
  }
});

TooltipTracker.reopenClass({
  positionalParams: ['xValues']
});

export default TooltipTracker;
