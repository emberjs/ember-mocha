import { describe, it } from 'mocha';
import { expect, assert } from 'chai';

describe('mocha-shim', function() {
  it('should work', function() {
    window.chai.expect(describe).to.equal(window.describe);
    window.chai.expect(it).to.equal(window.it);
  });
});

describe('chai-shim', function() {
  it('should work', function() {
    window.chai.expect(expect).to.equal(window.chai.expect);
    window.chai.expect(assert).to.equal(window.chai.assert);
  });
});
