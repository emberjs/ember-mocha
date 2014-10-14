import { TestModuleForModel } from 'ember-test-helpers';

export default function describeModel(name, description, callbacks, tests) {
  var module;
  if (!tests) {
    if (!callbacks) {
      tests = description;
      callbacks = {};
    } else {
      tests = callbacks;
      callbacks = description;
    }
    module = new TestModuleForModel(name, callbacks);

  } else {
    module = new TestModuleForModel(name, description, callbacks);
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
