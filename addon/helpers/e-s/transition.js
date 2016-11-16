import Ember from 'ember';
import { transition } from 'd3-transition';

export function emberSparklesTransition(params, { duration, name=null }) {
  return transition(name).duration(duration);
}

export default Ember.Helper.helper(emberSparklesTransition);
