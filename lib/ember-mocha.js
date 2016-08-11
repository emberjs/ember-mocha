import describeModule    from 'ember-mocha/describe-module';
import describeComponent from 'ember-mocha/describe-component';
import describeModel     from 'ember-mocha/describe-model';
import setupTestFactory  from 'ember-mocha/setup-test-factory';
import { it }            from 'mocha';
import { setResolver, TestModule } from 'ember-test-helpers';

const setupModuleTest = setupTestFactory(TestModule);

export {
  describeModule,
  describeComponent,
  describeModel,
  setupModuleTest,
  it,
  setResolver
};
