import {
  setupApplicationContext,
  teardownApplicationContext
} from '@ember/test-helpers';
import setupContainerTest from './setup-container-test';

export default function setupApplicationTest(options) {
  let hooks = setupContainerTest(options);

  hooks.beforeEach(function() {
    return setupApplicationContext(this);
  });
  hooks.afterEach(function() {
    return teardownApplicationContext(this);
  });

  return hooks;
}
