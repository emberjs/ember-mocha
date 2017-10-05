/*global mocha, describe, context, it, before, beforeEach, after, afterEach */

import wrapMochaHookInEmberRun from './-wrap-mocha-hook-in-ember-run';

var beforeEachRun = wrapMochaHookInEmberRun(beforeEach);
var afterEachRun = wrapMochaHookInEmberRun(afterEach);
var beforeRun = wrapMochaHookInEmberRun(before);
var afterRun = wrapMochaHookInEmberRun(after);

export {
  mocha,
  describe,
  context,
  it,
  before,
  beforeEach,
  after,
  afterEach,
  beforeRun,
  beforeEachRun,
  afterRun,
  afterEachRun
};
