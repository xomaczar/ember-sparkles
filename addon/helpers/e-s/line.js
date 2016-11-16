import Ember from 'ember';
import { line, curveLinear, curveStep, curveMonotoneX } from 'd3-shape';

export function d3Line([ xScale, yScale ], { xAccessor, yAccessor }) {
  let xFn = (d) => xScale(xAccessor(d));
  let yFn = (d) => yScale(yAccessor(d));
  return line().x(xFn).y(yFn).curve(curveMonotoneX);
}

export default Ember.Helper.helper(d3Line);
