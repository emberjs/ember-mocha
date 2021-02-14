import {
  setupRenderingContext
} from '@ember/test-helpers';
import setupTest from './setup-test';

export default function setupRenderingTest(_options) {
  let options = _options === undefined ? { waitForSettled: true } : Object.assign({ waitForSettled: true }, _options);
  let hooks = setupTest(options);

  hooks.beforeEach(function() {
    return setupRenderingContext(this._emberContext);
  });

  return hooks;
}
