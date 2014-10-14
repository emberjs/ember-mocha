import { createModule } from './mocha-module';
import { TestModule } from 'ember-test-helpers';

export default function describeModule(name, description, callbacks, tests) {
  createModule(TestModule, name, description, callbacks, tests);
};
