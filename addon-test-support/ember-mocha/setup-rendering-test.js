import {
  setupRenderingContext,
  teardownRenderingContext
} from '@ember/test-helpers';
import setupContainerTest from './setup-container-test';

export default function setupRenderingTest(options) {
  let hooks = setupContainerTest(options);

  hooks.beforeEach(function() {
    return setupRenderingContext(this);
  });
  hooks.afterEach(function() {
    return teardownRenderingContext(this);
  });

  return hooks;
}
