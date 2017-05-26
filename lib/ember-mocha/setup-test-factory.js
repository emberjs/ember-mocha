import Ember from 'ember';
import { before, beforeEach, afterEach, after } from 'mocha';
import { getContext } from 'ember-test-helpers';

export default function(Constructor) {
  return function setupTest(moduleName, options = {}) {
    var module;

    if (Ember.typeOf(moduleName) === 'object') {
      options = moduleName;
      moduleName = '';
    }

    before(function() {
      module = new Constructor(moduleName, options);
    });

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

    after(function() {
      module = null;
    });
  };
}
