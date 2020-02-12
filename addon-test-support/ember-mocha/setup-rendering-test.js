import {
  setupRenderingContext,
  teardownRenderingContext
} from '@ember/test-helpers';
import setupTest from './setup-test';

export default function setupRenderingTest(_options) {
  let options = _options === undefined ? { waitForSettled: true } : assign({ waitForSettled: true }, _options);
  let hooks = setupTest(options);

  hooks.beforeEach(function() {
    return setupRenderingContext(this);
  });
  hooks.afterEach(function() {
    return teardownRenderingContext(this);
  });

  return hooks;
}
