// import { timeFormat } from 'd3-time-format';
//
// const tickFilter = (tickFormat, skipIdx) => {
//
//   let formatter = timeFormat(tickFormat);
//
//   // Customer tickFormat
//   if (typeof tickFormat === 'function') {
//     formatter = tickFormat;
//   }
//
//   return (d, idx) => {
//     if (idx % skipIdx === 0) {
//       return formatter(d);
//     }
//   };
// };
//
// const { String: { capitalize } } = Ember;
//
// export function emberSparklesAxis([ scale ], { position, tickFormat, ticks, width, height, skipIdx=1, xGrid, yGrid, tickSizeOuter, tickValues }) {
//   let axisType = `axis${capitalize(position)}`;
//   let axisFn = axis[axisType];
//
//   let result = axisFn().scale(scale);
//
//   if (tickFormat) {
//     result.tickFormat(tickFilter(tickFormat, skipIdx));
//   }
//
//   if (ticks) {
//     result.ticks(ticks);
//   }
//
//   result.ticks(ticks);
//   result.tickFormat(tickFormat);
//   result.tickValues(tickValues);
//
//   let innerSize = gridlines ? (-1) * gridLength : tickSizeInner;
//   result.tickSizeInner(innerSize);
//   result.tickSizeOuter(tickSizeOuter);
//   result.tickPadding(tickPadding);
//
//   if(tickValues) {
//     result.tickValues(tickValues);
//   }
//
//   if (typeof tickSizeOuter !== 'undefined') {
//     result.tickSizeOuter(tickSizeOuter);
//   }
//
//   return result;
// }
//
// export default Ember.Helper.helper(emberSparklesAxis);

import Ember from 'ember';
import axis from 'd3-axis';

const { String: { capitalize } } = Ember;

export function emberSparklesAxis([ scale ], { position, ticks, tickFormat, tickValues, tickSizeInner=6, tickSizeOuter=6, tickPadding=3, gridlines=false, gridLength }) {
  let axisFn = axis[`axis${capitalize(position)}`];
  let result = axisFn().scale(scale);

  result.ticks(ticks);
  result.tickFormat(tickFormat);

  if (tickValues) {
    result.tickValues(tickValues);
  }

  let innerSize = gridlines ? (-1) * gridLength : tickSizeInner;
  result.tickSizeInner(innerSize);
  result.tickSizeOuter(tickSizeOuter);
  result.tickPadding(tickPadding);

  return result;
}

export default Ember.Helper.helper(emberSparklesAxis);
