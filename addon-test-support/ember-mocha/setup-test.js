import {
  beforeEach,
  afterEach
} from 'mocha';
import {
  setupContext,
  teardownContext
} from '@ember/test-helpers';
import { resolve } from 'rsvp';

function chainHooks(hooks, context) {
  return hooks.reduce((promise, fn) => promise.then(fn.bind(context)), resolve());
}

function setupPauseTest(context) {
  let originalPauseTest = context.pauseTest;
  context.pauseTest = function Mocha_pauseTest() {
    context.timeout(0); // prevent the test from timing out

    return originalPauseTest.call(context);
  };
}

export default function setupTest(options) {
  let beforeEachHooks = [];
  let afterEachHooks = [];
  let isInternalKey = () => false;

  beforeEach(function() {


    return setupContext(this, options)
      .then(() => setupPauseTest(this))
      .then(() => chainHooks(beforeEachHooks, this))
      .then(() => {
        // use a closure to capture the state of `this`
        // so we can reliably compare the difference later
        let originalContext = Object.keys(this);
        isInternalKey = key => originalContext.includes(key);
      });
  });

  afterEach(function() {

    let teardownUserKeysAndOwner = () => {
      // compare what has been currently set
      // on the test context with what was
      // there from internal test setup
      Object.keys(this).filter(key => !isInternalKey(key))
        .forEach(key => delete this[key]);
      // delete the owner instance
      delete this.owner;
    };
    return chainHooks(afterEachHooks, this)
      .then(() => teardownContext(this))
      .then(() => teardownUserKeysAndOwner());
  });

  /**
   * Provide a workaround for the inconvenient FIFO-always order of beforeEach/afterEach calls
   *
   * ```js
   * let hooks = setupTest();
   * hooks.beforeEach(function() { ... });
   * hooks.afterEach(function() { ... });
   * ```
   *
   * beforeEach hooks are called after setupUnitTest#beforeEach in FIFO (first in first out) order
   * afterEach hooks are called before setupUnitTest#afterEach in LIFO (last in first out) order
   *
   * @type {{beforeEach: (function(*)), afterEach: (function(*))}}
   */
  let hooks = {
    beforeEach(fn) {
      beforeEachHooks.push(fn);
    },
    afterEach(fn) {
      afterEachHooks.unshift(fn);
    }
  };

  return hooks;
}
