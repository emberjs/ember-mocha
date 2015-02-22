import { createModule, createOnly, createSkip } from './mocha-module';
import { TestModuleForModel } from 'ember-test-helpers';

function describeModel(name, description, callbacks, tests) {
  createModule(TestModuleForModel, name, description, callbacks, tests);
}

describeModel.only = createOnly(TestModuleForModel);

describeModel.skip = createSkip(TestModuleForModel);

export default describeModel;
