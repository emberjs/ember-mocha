import {
  beforeEach,
  afterEach
} from 'mocha';
import {
  setupContext,
  teardownContext
} from '@ember/test-helpers';
import { assign, merge } from '@ember/polyfills';
import { resolve } from 'rsvp';
import EmberTestContext from './ember-test-context';

const _assign = assign || merge;

function chainHooks(hooks, context) {
  return hooks.reduce((promise, fn) => promise.then(fn.bind(context)), resolve());
}

function setupPauseTest(emberContext, mochaContext) {
  let originalPauseTest = emberContext.pauseTest;
  let mochaTimeout = mochaContext.timeout;
  emberContext.pauseTest = function Mocha_pauseTest() {
    mochaTimeout.call(mochaContext, 0); // prevent the test from timing out

    return originalPauseTest.call(emberContext);
  };
}

export default function setupTest(options) {
  let emberContext;
  let originalContext;
  let beforeEachHooks = [];
  let afterEachHooks = [];

  beforeEach(function() {
    let mochaContext = this;
    originalContext = _assign({}, mochaContext);
    emberContext = new EmberTestContext(mochaContext);

    return setupContext(emberContext, options)
      .then(() => setupPauseTest(emberContext, mochaContext))
      .then(() => chainHooks(beforeEachHooks, emberContext))
      .then(() => emberContext.syncProperties());
  });

  afterEach(function() {
    let mochaContext = this;
    return chainHooks(afterEachHooks, emberContext)
      .then(() => teardownContext(emberContext))
      .then(() => {
        // delete any extraneous properties
        for (let key in mochaContext) {
          if (!(key in originalContext)) {
            delete mochaContext[key];
          }
        }

        // copy over the original values
        _assign(mochaContext, originalContext);
      });
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
