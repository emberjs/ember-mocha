import { TestModule } from 'ember-test-helpers';

export default function describeModule(name, description, callbacks, tests) {
  var module = new TestModule(name, description, callbacks);

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