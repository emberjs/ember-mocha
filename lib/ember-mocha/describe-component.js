import { TestModuleForComponent } from 'ember-test-helpers';

export default function describeComponent(name, description, callbacks, tests) {
  if (!tests) {
    if (!callbacks) {
      tests = description;
      callbacks = {};
    } else {
      tests = callbacks;
      callbacks = description;
    }
    description = name;
  }

  var module = new TestModuleForComponent(name, description, callbacks);

  describe(module.name, function() {
    beforeEach(function() {
      module.setup();
    });

    afterEach(function() {
      module.teardown();
    });

    tests();
  });
};