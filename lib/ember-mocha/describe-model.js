import { createModule } from './mocha-module';
import { TestModuleForModel } from 'ember-test-helpers';

export default function describeModel(name, description, callbacks, tests) {
  createModule(TestModuleForModel, name, description, callbacks, tests);
};
