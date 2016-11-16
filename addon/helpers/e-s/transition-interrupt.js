import Ember from 'ember';

export function eSTransitionInterrupt(params/*, hash*/) {
  return function(d3sl) {
    return d3sl.interrupt();
  }
}

export default Ember.Helper.helper(eSTransitionInterrupt);
