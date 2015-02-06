import { createModule, createOnly, createSkip } from './mocha-module';
import { TestModule } from 'ember-test-helpers';

export default function describeModule(name, description, callbacks, tests) {
  createModule(TestModule, name, description, callbacks, tests);
}

describeModule.only = createOnly(TestModule);

describeModule.skip = createSkip(TestModule);
