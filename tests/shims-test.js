import { mocha, describe, context, it, before, after, beforeEach, afterEach } from 'mocha';
import { expect, assert, config, use, Assertion } from 'chai';

describe('mocha-shim', function() {
  beforeEach(function() {
    this.beforeEachRunInEmberRunLoop = Ember.run.currentRunLoop;
  });
  afterEach(function() {
    expect(Ember.run.currentRunLoop).to.be.ok;
  });

  it('runs the beforeEach hook inside the run loop', function() {
    expect(this.beforeEachRunInEmberRunLoop).to.be.ok;
  });

  it('should work', function() {
    window.chai.expect(mocha).to.equal(window.mocha);
    window.chai.expect(describe).to.equal(window.describe);
    window.chai.expect(context).to.equal(window.context);
    window.chai.expect(it).to.equal(window.it);
    window.chai.expect(before).to.equal(window.before);
    window.chai.expect(after).to.equal(window.after);
    window.chai.expect(beforeEach.withoutEmberRun).to.equal(window.beforeEach);
    window.chai.expect(afterEach.withoutEmberRun).to.equal(window.afterEach);
  });
});

describe('chai-shim', function() {
  it('should work', function() {
    window.chai.expect(expect).to.equal(window.chai.expect);
    window.chai.expect(assert).to.equal(window.chai.assert);
    window.chai.expect(config).to.equal(window.chai.config);
    window.chai.expect(use).to.equal(window.chai.use);
    window.chai.expect(Assertion).to.equal(window.chai.Assertion);
  });
});
