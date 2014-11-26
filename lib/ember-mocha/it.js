import Ember from 'ember';

function resetViews() {
  Ember.View.views = {};
}

var originalIt = window.it;

function wrap(specifier) {
  return function (testName, callback) {
    var wrapper;

    if (!callback) {
      wrapper = null;
    } else if (callback.length === 1) {
      wrapper = function(done) {
        resetViews();
        return callback.call(this, done);
      };
    } else {
      wrapper = function() {
        resetViews();
        return callback.call(this);
      };
    }
    specifier(testName, wrapper);
  };
}

var wrappedIt = wrap(window.it);
wrappedIt.only = wrap(window.it.only);
wrappedIt.skip = function(testName, callback) {
  originalIt(testName);
};

export default wrappedIt;
