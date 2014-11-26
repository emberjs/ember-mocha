import Ember from 'ember';
import { getContext } from 'ember-test-helpers';

export function createModule(Constructor, name, description, callbacks, tests) {
  var module;

  if (!tests) {
    if (!callbacks) {
      tests = description;
      callbacks = {};
    } else {
      tests = callbacks;
      callbacks = description;
    }
    module = new Constructor(name, callbacks);

  } else {
    module = new Constructor(name, description, callbacks);
  }

  describe(module.name, function() {
    beforeEach(function() {
      module.setup();
      var context = getContext();
      var keys = Ember.keys(context);
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        this[key] = context[key];
      }
    });

    afterEach(function() {
      module.teardown();
    });

    tests();
  });
}
