/* globals require */
(function() {

  function ready(fn) {
    if (document.readyState !== 'loading') {
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }

  ready(function() {
    var emberMocha = require('ember-mocha');
    var loadTests = emberMocha['loadTests'];
    var startTests = emberMocha['startTests'];

    // Attempt to mitigate sourcemap issues in Chrome
    // See: https://github.com/ember-cli/ember-cli/issues/3098
    //      https://github.com/ember-cli/ember-cli-qunit/pull/39
    setTimeout(function() {
      loadTests();
      startTests();
    }, 250);
  });
})();
