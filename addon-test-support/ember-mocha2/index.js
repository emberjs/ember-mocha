/* globals mocha */

export { loadTests } from './test-loader';

import { loadTests } from './test-loader';
import setupTest from 'ember-mocha2/setup-test';
import setupRenderingTest from 'ember-mocha2/setup-rendering-test';
import setupApplicationTest from 'ember-mocha2/setup-application-test';
import { beforeEach, afterEach } from 'mocha';
import { setResolver, resetOnerror } from '@ember/test-helpers';
import Ember from 'ember';

/**
  Ensures that `Ember.testing` is set to `true` before each test begins
  (including `before` / `beforeEach`), and reset to `false` after each test is
  completed. This is done via `beforeEach` and `afterEach`.
 */
export function setupEmberTesting() {
  beforeEach(function() {
    Ember.testing = true;
  });

  afterEach(function() {
    Ember.testing = false;
  });
}

function setupMocha(options) {
  mocha.setup(options || {});
}

/**
 * Instruct Mocha to start the tests.
 */
export function startTests() {
  mocha.run();
}

function setupResetOnerror() {
  afterEach(function() {
    resetOnerror();
  });
}

/**
 * @method start
 * @param {Object} [options] Options to be used for enabling/disabling behaviors
 * @param {Boolean} [options.loadTests] If `false` tests will not be loaded automatically.
 * @param {Boolean} [options.startTests] If `false` tests will not be automatically started
 * @param {Object}  [options.mochaOptions] options to pass mocha setup method
 * (you must run `startTests()` to kick them off).
 */
export function start(options = {}) {
  setupMocha(options?.mochaOptions);

  setupResetOnerror();

  if (options.loadTests !== false) {
    loadTests();
  }

  if (options.startTests !== false) {
    startTests();
  }
}

export {
  setupTest,
  setupRenderingTest,
  setupApplicationTest,
  setResolver,
};
