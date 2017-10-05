/*global mocha, describe, context, it */

import wrapMochaHookInEmberRun from './-wrap-mocha-hook-in-ember-run';

var beforeEach = window.beforeEach;
var afterEach = window.afterEach;
var before = window.before;
var after = window.after;

beforeEach.run = wrapMochaHookInEmberRun(beforeEach);
afterEach.run = wrapMochaHookInEmberRun(afterEach);
before.run = wrapMochaHookInEmberRun(before);
after.run = wrapMochaHookInEmberRun(after);

export {
  mocha,
  describe,
  context,
  it,
  before,
  beforeEach,
  after,
  afterEach
};
