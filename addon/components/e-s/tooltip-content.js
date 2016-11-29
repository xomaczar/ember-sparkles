import Ember from 'ember';
import layout from '../../templates/components/e-s/tooltip-content';
import computed, { or } from 'ember-computed';
import { scheduleOnce } from 'ember-runloop';
import { select } from 'd3-selection';

const {
  isNone
} = Ember;


export default Ember.Component.extend({
  layout,
  tagName: 'g',
  classNames: 'plot-dimension',
  attributeBindings: ['transform'],
  fill: '#fff',
  rx: 3,
  ry: 3,
  padding: { left: 7, right: 7, top: 1, bottom: 1 },

  xCenter: 0,
  y: 0,

  _contentWidth: 0,
  maxWidth: 0,
  height: 0,

  verticalPadding: computed('padding.{top,bottom}', function() {
    return this.get('padding.top') + this.get('padding.bottom');
  }).readOnly(),

  horizontalPadding: computed('padding.{left,right}', function() {
    return this.get('padding.left') + this.get('padding.right');
  }).readOnly(),

  didInsertElement() {
    this._super(...arguments);
    this.selection = select(this.element);
  },

  didReceiveAttrs() {
    this._super(...arguments);
  },

  didRender() {
    this._super(...arguments);
    scheduleOnce('afterRender', this, this._sizeInnerText);
    // this._sizeInnerText();
  },

  _sizeInnerText() {
    debugger;
    let text = this.selection.select('text');
    let textLength = text.node() ? text.node().getComputedTextLength() : 0;

    // let rectWidth = textLength;
    this.set('_contentWidth', textLength + this.get('horizontalPadding'));
    // this.set('_centerX', rectWidth/2);
    // Find x, y, and width. Height is provided.

  },

  _contentCenter: computed('_contentWidth', function() {
    return this.get('_contentWidth')/2;
  }).readOnly(),

  _contentHeight: computed('height', 'verticalPadding', function() {
    return this.get('height') + this.get('verticalPadding');
  }).readOnly(),

  transform: computed('maxWidth', 'xCenter', '_contentWidth', 'padding', {
    get() {
      let maxWidth = this.get('maxWidth');
      let halfWidth = this.get('_contentWidth') / 2;
      let centeredX = this.get('xCenter');
      let translateX = -halfWidth;
      //centeredX/2;

      if (centeredX < halfWidth) {
        translateX = -this.get('padding.left');//halfWidth - centeredX;
      } else if (centeredX + halfWidth > maxWidth) {
        translateX = -this.get('_contentWidth') + this.get('padding.right');
      }

      return `translate(${translateX}, 0)`
    }
  }).readOnly(),

});
