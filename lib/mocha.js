import Ember from 'ember';

/*global mocha, describe, context, it, before, after */


/**
 * Takes a function that defines a mocha hook, like `beforeEach` and
 * runs its callback inside an `Ember.run`.
 *
 * In the canonical mocha style, beforeEach/afterEach blocks are for
 * taking actions that have potentially asynchronous side effects like
 * making network requests, and in the case of ember doing things like
 * sending events, or visiting pages. In the context of an Ember
 * application this more often than not means doing something inside
 * of an `Ember.run`. The resulting wrapper has a reference to
 * original hook function as the `withoutEmberRun`. E.g.
 *
 *   import { beforeEach } from 'mocha';
 *
 *   beforeEach(function {
 *     // this is run inside `Ember.run`
 *   })

 *   beforeEach.withoutEmberRun(function({
 *    // this is not inside `Ember.run`
 *   }))
 *
 * You should almost never need to use the version without `Ember.run`
 *
 * Mocha supports two invocation styles for its hooks depending on the
 * synchronization requirements of the setup code, and this wrapper
 * supports both of them.
 *
 * As normal, if the setup code returns a promise, the testcase will
 * wait until the promise is settled.

 * @param {Function} original The native mocha hook to wrap
 * @returns {Function} the wrapped hook
 * @private
 */
function wrapMochaHookInEmberRun(original) {
  function wrapper(fn) {
    // the callback expects a `done` parameter
    if (fn.length) {
      return original(function(done) {
        return Ember.run((function(_this) {
          return function() {
            return fn.call(_this, done);
          };
        })(this));
      });
    } else {
      // no done parameter.
      return original(function() {
        return Ember.run((function(_this) {
          return function() {
            return fn.call(_this);
          };
        })(this));
      });
    }
  }
  wrapper.withoutEmberRun = original;
  return wrapper;
}



var beforeEach = wrapMochaHookInEmberRun(window.beforeEach);
var afterEach = wrapMochaHookInEmberRun(window.afterEach);

export {
  mocha,
  describe,
  context,
  it,
  before,
  beforeEach,
  after,
  afterEach
};
