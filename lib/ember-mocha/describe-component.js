import { createModule } from './mocha-module';
import { TestModuleForComponent } from 'ember-test-helpers';

export default function describeComponent(name, description, callbacks, tests) {
  createModule(TestModuleForComponent, name, description, callbacks, tests);
}
