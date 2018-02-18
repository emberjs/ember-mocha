import {
  beforeEach,
  afterEach
} from 'mocha';
import {
  setupRenderingContext,
  teardownRenderingContext
} from '@ember/test-helpers';
import setupContainerTest from './setup-container-test';

export default function setupRenderingTest(options) {
  afterEach(function() {
    return teardownRenderingContext(this);
  });

  setupContainerTest(options);

  beforeEach(function() {
    return setupRenderingContext(this);
  });
}
