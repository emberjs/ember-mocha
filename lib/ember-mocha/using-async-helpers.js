/* global wait */

export default function usingAsyncHelpers(fn) {
  return function() {
    fn.apply(this);
    return wait();
  };
}
