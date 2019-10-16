import {
  getContext,
  setupApplicationContext,
  teardownApplicationContext
} from '@ember/test-helpers';
import setupTest from './setup-test';

export default function setupApplicationTest(options) {
  let hooks = setupTest(options);

  hooks.beforeEach(function() {
    return setupApplicationContext(getContext());
  });
  hooks.afterEach(function() {
    return teardownApplicationContext(getContext());
  });

  return hooks;
}
