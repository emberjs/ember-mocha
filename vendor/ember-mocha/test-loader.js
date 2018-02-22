/* globals mocha, require, requirejs */
(function() {

  function ready(fn) {
    if (document.readyState !== 'loading') {
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }

  ready(function() {
    var testLoaderModulePath = 'ember-cli-test-loader/test-support/index';

    if (!requirejs.entries[testLoaderModulePath]) {
      testLoaderModulePath = 'ember-cli/test-loader';
    }

    var TestLoader = require(testLoaderModulePath)['default'];
    TestLoader.prototype.shouldLoadModule = function(moduleName) {
      return moduleName.match(/[-_]test$/) || moduleName.match(/\.jshint$/);
    };

    TestLoader.prototype.moduleLoadFailure = function(moduleName, error) {
      describe('TestLoader Failures', function() {
        it(moduleName + ': could not be loaded', function() {
          throw error;
        });
      });
    };

    // Attempt to mitigate sourcemap issues in Chrome
    // See: https://github.com/ember-cli/ember-cli/issues/3098
    //      https://github.com/ember-cli/ember-cli-qunit/pull/39
    setTimeout(function() {
      TestLoader.load();

      mocha.run();
    }, 250);
  });
})();
