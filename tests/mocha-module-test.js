import { createModule } from 'ember-mocha/mocha-module';
import { TestModule } from 'ember-test-helpers';
import { describe, it, before, after, beforeEach, afterEach, mocha } from 'mocha';
import { expect } from 'chai';

describe('MochaModule', function() {
  createModule(TestModule, 'component:x-foo', 'context', function() {
    var testFunctionContext = this;
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
    it("preserves mocha suite context in outer test function", function() {
      expect(testFunctionContext).to.be.an.instanceof(mocha.suite.constructor);
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
