import Ember from 'ember';
import { getContext } from 'ember-test-helpers';

function resetViews() {
  Ember.View.views = {};
}

export default function(testName, callback) {
  function wrapper() {
    var context = getContext();

    resetViews();

    callback.call(context);
  }

  it(testName, wrapper);
}
