import Ember from 'ember';
import { before, beforeEach, afterEach, after } from 'mocha';
import { getContext } from '@ember/test-helpers';

export default function(Constructor, functionName) {
  return function setupTest(moduleName, options = {}) {
    let deprecationMessage;
    if (functionName === 'setupTest') {
      deprecationMessage = 'The `setupTest()` function that accepts a module ' +
        'name has been deprecated. Please use `setupTest()` without a module ' +
        'name and look it up via `this.owner.lookup(moduleName)` instead.';
    } else if (functionName === 'setupComponentTest') {
      deprecationMessage = 'The `setupComponentTest()` function is deprecated. ' +
        'Please use the `setupRenderingTest()` function instead.';
    }  else if (functionName === 'setupAcceptanceTest') {
      deprecationMessage = 'The `setupAcceptanceTest()` function is deprecated. ' +
        'Please use the `setupApplicationTest()` function instead.';
    } else {
      deprecationMessage = `The \`${functionName}()\` function is deprecated. ` +
        `Please use the \`setupTest()\` function instead.`;
    }

    var module;

    if (Ember.typeOf(moduleName) === 'object') {
      options = moduleName;
      moduleName = '';
    }

    before(function() {
      module = new Constructor(moduleName, options);
    });

    beforeEach(function() {
      Ember.deprecate(deprecationMessage, false, {
        id: 'ember-mocha.setup-test',
        until: '0.16.0',
        url: 'https://github.com/emberjs/ember-mocha#upgrading',
      });

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
