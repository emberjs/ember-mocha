import { TestModuleForComponent } from 'ember-test-helpers';

export default function describeComponent(name, description, callbacks, tests) {
  var module;
  if (!tests) {
    if (!callbacks) {
      tests = description;
      callbacks = {};
    } else {
      tests = callbacks;
      callbacks = description;
    }
    module = new TestModuleForComponent(name, callbacks);

  } else {
    module = new TestModuleForComponent(name, description, callbacks);
  }

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