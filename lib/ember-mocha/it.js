import Ember from 'ember';
import { getContext } from 'ember-test-helpers';

function resetViews() {
  Ember.View.views = {};
}

export default function(testName, callback) {
  var wrapper;
  
  if (callback.length === 1) {
    wrapper = function(done) {
      resetViews();
      return callback.call(getContext(), done);
    };
  } else {
    wrapper = function() {
      resetViews();
      return callback.call(getContext());
    };
  }

  it(testName, wrapper);
}
