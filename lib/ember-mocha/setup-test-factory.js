import { before, beforeEach, afterEach } from 'mocha';
import { getContext } from 'ember-test-helpers';

export default function(Constructor) {
  return function setupTest(moduleName, options) {
    var module;

    before(function() {
      module = new Constructor(moduleName, options);
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
  };
}
