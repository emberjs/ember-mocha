import {
  getContext,
  setupRenderingContext,
  teardownRenderingContext
} from '@ember/test-helpers';
import setupTest from './setup-test';

export default function setupRenderingTest(options) {
  let hooks = setupTest(options);

  hooks.beforeEach(function() {
    return setupRenderingContext(getContext());
  });
  hooks.afterEach(function() {
    return teardownRenderingContext(getContext());
  });

  return hooks;
}
