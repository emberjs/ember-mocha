import Ember from 'ember';
import { beforeEach, afterEach, describe } from 'mocha';
import { getContext } from 'ember-test-helpers';

export function createModule(Constructor, name, description, callbacks, tests, method) {
  Ember.deprecate(
    'The describeModule(), describeModel() and describeComponent() methods have been deprecated in favor of ' +
    'setupTest(), setupModelTest() and setupComponentTest().',
    false,
    { id: 'ember-mocha.describe-helpers', until: '1.0.0', url: 'https://github.com/emberjs/ember-mocha#upgrading' }
  );

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
      return module.setup().then(() => {
        var context = getContext();
        Object.keys(context).forEach(key => {
          this[key] = context[key];
        });
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
