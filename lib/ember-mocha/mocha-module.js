import { beforeEach, afterEach, describe } from 'mocha';
import Ember from 'ember';
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
      var self = this;
      return module.setup().then(function() {
        var context = getContext();
        var keys = Object.keys(context);
        for (var i = 0; i < keys.length; i++) {
          var key = keys[i];
          self[key] = context[key];
        }
      });
    });

    afterEach(function() {
      return module.teardown();
    });

    tests = tests || function() {};
    tests.call(this);
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
