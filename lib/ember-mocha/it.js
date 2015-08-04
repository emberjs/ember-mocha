import Ember from 'ember';

var originalIt = window.it;

function wrap(specifier) {
  return function (testName, callback) {
    var wrapper;

    if (!callback) {
      wrapper = null;
    } else if (callback.length === 1) {
      wrapper = function(done) {
        return callback.call(this, done);
      };
    } else {
      wrapper = function() {
        return callback.call(this);
      };
    }

    if (wrapper) {
      wrapper.toString = function() {
        return callback.toString();
      };
    }

    return specifier(testName, wrapper);
  };
}

var wrappedIt = wrap(window.it);
wrappedIt.only = wrap(window.it.only);
wrappedIt.skip = function(testName, callback) {
  originalIt(testName);
};

export default wrappedIt;
