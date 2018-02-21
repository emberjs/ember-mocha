import {
  beforeEach,
  afterEach
} from 'mocha';
import {
  setupContext,
  teardownContext
} from '@ember/test-helpers';
import { assign, merge } from '@ember/polyfills';

const _assign = assign || merge;

export default function setupUnitTest(options) {
  let originalContext;

  beforeEach(function() {
    originalContext = _assign({}, this);

    return setupContext(this, options).then(() => {

      let originalPauseTest = this.pauseTest;
      this.pauseTest = function Mocha_pauseTest() {
        this.timeout(0); // prevent the test from timing out

        return originalPauseTest.call(this);
      };
    });
  });

  afterEach(function() {
    return teardownContext(this).then(() => {
      // delete any extraneous properties
      for (let key in this) {
        if (!(key in originalContext)) {
          delete this[key];
        }
      }

      // copy over the original values
      _assign(this, originalContext);
    });
  });
}
