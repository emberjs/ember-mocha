import { mocha, describe, context, it, before, after, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';

import Ember from 'ember';

describe('mocha-shim', function() {

  describe('beforeEach and afterEach', function() {
    beforeEach(function() {
      this.beforeEachRunLoop = Ember.run.currentRunLoop;
    });

    afterEach(function() {
      expect(Ember.run.currentRunLoop).to.be.ok;
    });

    it('does use the runloop', function() {
      expect(this.beforeEachRunLoop).to.be.ok;
    });
  });

  describe('before and after', function() {
    before(function() {
      this.beforeRunLoop = Ember.run.currentRunLoop;
    });

    after(function() {
      expect(Ember.run.currentRunLoop).to.be.null;
    });

    it('do not use the runloop', function() {
      expect(this.beforeRunLoop).to.be.null;
    });
  });

  it('should export global variables defined by mocha', function() {
    expect(mocha).to.equal(window.mocha);
    expect(describe).to.equal(window.describe);
    expect(context).to.equal(window.context);
    expect(it).to.equal(window.it);
    expect(before).to.equal(window.before);
    expect(after).to.equal(window.after);
    expect(beforeEach.withoutEmberRun).to.equal(window.beforeEach);
    expect(afterEach.withoutEmberRun).to.equal(window.afterEach);
  });
});
