import { before, beforeEach, afterEach } from 'mocha';

export default function(Constructor) {
  return function setupTest(moduleName, options) {
    var module;

    before(function() {
      module = new Constructor(moduleName, options);
    });

    beforeEach(function() {
      module.setContext(this);

      return module.setup();
    });

    afterEach(function() {
      return module.teardown();
    });
  };
}
