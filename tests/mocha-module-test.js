import { createModule } from 'ember-mocha/mocha-module';
import { TestModule } from 'ember-test-helpers';
import { describe, it, before, after, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';

describe('MochaModule', function() {
  createModule(TestModule, 'component:x-foo', 'context', function() {
    var thisInBefore, thisInBeforeEach;

    before(function() {
      thisInBefore = this;
    });
    beforeEach(function() {
      thisInBeforeEach = this;
    });
    it("is preserved inside all assertions and hooks", function() {
      expect(this).to.be.defined;
      expect(this).to.equal(thisInBefore);
      expect(this).to.equal(thisInBeforeEach);
    });
    afterEach(function() {
      expect(this).to.equal(thisInBeforeEach);
    });
    after(function() {
      expect(this).to.equal(thisInBefore);
      expect(this).to.equal(thisInBeforeEach);
    });
  });
});
