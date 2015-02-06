import { createModule, createOnly, createSkip } from './mocha-module';
import { TestModuleForComponent } from 'ember-test-helpers';

export default function describeComponent(name, description, callbacks, tests) {
  createModule(TestModuleForComponent, name, description, callbacks, tests);
}

describeComponent.only = createOnly(TestModuleForComponent);

describeComponent.skip = createSkip(TestModuleForComponent);
