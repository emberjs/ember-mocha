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
import Ember from 'ember';

let teardownMandatorySetter;
if (Ember.__loader && Ember.__loader.registry && Ember.__loader.registry['@ember/-internals/utils/index']) {
  teardownMandatorySetter = Ember.__loader.require('@ember/-internals/utils').teardownMandatorySetter;
}

const _assign = assign || merge;

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

export default function setupTest(_options) {
  let originalContext;
  let beforeEachHooks = [];
  let afterEachHooks = [];
  let options = _options === undefined ? { waitForSettled: true } : assign({ waitForSettled: true }, _options);

  beforeEach(function() {
    originalContext = _assign({}, this);

    return setupContext(this, options)
      .then(() => setupPauseTest(this))
      .then(() => chainHooks(beforeEachHooks, this));
  });

  afterEach(function() {
    return chainHooks(afterEachHooks, this)
      .then(() => teardownContext(this, options))
      .then(() => {
        // delete any extraneous properties
        for (let key in this) {
          if (!(key in originalContext)) {
            // starting from Ember 3.13 this seems to be necessary
            if (teardownMandatorySetter) {
              teardownMandatorySetter(this, key);
            }

            delete this[key];
          }
        }

        // copy over the original values
        _assign(this, originalContext);
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
