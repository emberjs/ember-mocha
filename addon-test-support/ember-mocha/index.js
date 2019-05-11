/* globals mocha */

export { loadTests } from './test-loader';

import { loadTests } from './test-loader';
import setupTest from 'ember-mocha/setup-test';
import setupRenderingTest from 'ember-mocha/setup-rendering-test';
import setupApplicationTest from 'ember-mocha/setup-application-test';
import { it, afterEach } from 'mocha';
import { setResolver, resetOnerror } from '@ember/test-helpers';

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
 * (you must run `startTests()` to kick them off).
 */
export function start(options = {}) {
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
  it,
  setResolver,
};
