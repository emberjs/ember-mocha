import { mocha, describe, it, before, after, beforeEach, afterEach } from 'mocha';
import { expect, assert } from 'chai';

describe('mocha-shim', function() {
  it('should work', function() {
    window.chai.expect(mocha).to.equal(window.mocha);
    window.chai.expect(describe).to.equal(window.describe);
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
  });
});
