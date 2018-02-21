import {
  beforeEach,
  afterEach
} from 'mocha';
import {
  setupApplicationContext,
  teardownApplicationContext
} from '@ember/test-helpers';
import setupContainerTest from './setup-container-test';

export default function setupApplicationTest(options) {
  afterEach(function() {
    return teardownApplicationContext(this);
  });

  setupContainerTest(options);

  beforeEach(function() {
    return setupApplicationContext(this);
  });
}
