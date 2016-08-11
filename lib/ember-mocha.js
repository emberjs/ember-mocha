import describeModule    from 'ember-mocha/describe-module';
import describeComponent from 'ember-mocha/describe-component';
import describeModel     from 'ember-mocha/describe-model';
import setupTestFactory  from 'ember-mocha/setup-test-factory';
import { it }            from 'mocha';
import {
  setResolver,
  TestModule,
  TestModuleForModel,
  TestModuleForComponent,
} from 'ember-test-helpers';

const setupModuleTest = setupTestFactory(TestModule);
const setupComponentTest = setupTestFactory(TestModuleForComponent);
const setupModelTest = setupTestFactory(TestModuleForModel);

export {
  describeModule,
  describeComponent,
  describeModel,
  setupModuleTest,
  setupComponentTest,
  setupModelTest,
  it,
  setResolver
};
