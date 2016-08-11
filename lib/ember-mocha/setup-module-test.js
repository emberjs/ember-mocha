import { before, beforeEach, afterEach } from 'mocha';
import { TestModule, getContext } from 'ember-test-helpers';

export default function setupModuleTest(moduleName, options) {
  var module;

  before(function() {
    module = new TestModule(moduleName, options);
  });

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
}
