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
  TestModuleForAcceptance
} from 'ember-test-helpers';

const setupTest = setupTestFactory(TestModule);
const setupAcceptanceTest = setupTestFactory(TestModuleForAcceptance);
const setupComponentTest = setupTestFactory(TestModuleForComponent);
const setupModelTest = setupTestFactory(TestModuleForModel);

export {
  describeModule,
  describeComponent,
  describeModel,
  setupTest,
  setupAcceptanceTest,
  setupComponentTest,
  setupModelTest,
  it,
  setResolver
};
