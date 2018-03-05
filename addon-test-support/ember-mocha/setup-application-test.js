import {
  setupApplicationContext,
  teardownApplicationContext
} from '@ember/test-helpers';
import setupTest from './setup-test';

export default function setupApplicationTest(options) {
  let hooks = setupTest(options);

  hooks.beforeEach(function() {
    return setupApplicationContext(this);
  });
  hooks.afterEach(function() {
    return teardownApplicationContext(this);
  });

  return hooks;
}
