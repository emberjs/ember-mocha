import { beforeEach, afterEach, describe } from 'mocha';
import { getContext } from 'ember-test-helpers';

export function createModule(Constructor, name, description, callbacks, tests, method) {
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


  function moduleBody() {
    beforeEach(function() {
      module.setContext(this);

      return module.setup();
    },

    afterEach(function() {
      return module.teardown();
    });

    tests = tests || function() {};
    tests();
  }
  if (method) {
    describe[method](module.name, moduleBody);
  } else {
    describe(module.name, moduleBody);
  }
}

export function createOnly(Constructor) {
  return function(name, description, callbacks, tests) {
    createModule(Constructor, name, description, callbacks, tests, "only");
  };
}

export function createSkip(Constructor) {
  return function(name, description, callbacks, tests) {
    createModule(Constructor, name, description, callbacks, tests, "skip");
  };
}
