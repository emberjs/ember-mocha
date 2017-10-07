import Ember from 'ember';
import { mocha, describe, context, it, before, after, beforeEach, afterEach } from 'mocha';

describe('mocha-shim', function() {

  describe('beforeEach.run and afterEach.run', function() {
    beforeEach.run(function() {
      this.beforeEachRunInEmberRunLoop = Ember.run.currentRunLoop;
    });

    afterEach.run(function() {
      window.chai.expect(Ember.run.currentRunLoop).to.be.ok;
    });

    it('run inside the run loop', function() {
      window.chai.expect(this.beforeEachRunInEmberRunLoop).to.be.ok;
    });
  });

  describe('before.run and after.run', function() {
    before.run(function() {
      this.beforeEachRunInEmberRunLoop = Ember.run.currentRunLoop;
    });

    after.run(function() {
      window.chai.expect(Ember.run.currentRunLoop).to.be.ok;
    });

    it('run inside the run loop', function() {
      window.chai.expect(this.beforeEachRunInEmberRunLoop).to.be.ok;
    });
  });

  it('should export global variables defined by mocha', function() {
    window.chai.expect(mocha).to.equal(window.mocha);
    window.chai.expect(describe).to.equal(window.describe);
    window.chai.expect(context).to.equal(window.context);
    window.chai.expect(it).to.equal(window.it);
    window.chai.expect(before).to.equal(window.before);
    window.chai.expect(after).to.equal(window.after);
    window.chai.expect(beforeEach).to.equal(window.beforeEach);
    window.chai.expect(afterEach).to.equal(window.afterEach);
  });
});
