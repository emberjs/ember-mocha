import { describe, it } from 'mocha';
import { expect, assert } from 'chai';

describe('mocha-shim', function() {
  it('should work', function() {
    window.expect(describe).to.equal(window.describe);
    window.expect(it).to.equal(window.it);
  });
});

describe('chai-shim', function() {
  it('should work', function() {
    window.expect(expect).to.equal(window.chai.expect);
    window.expect(assert).to.equal(window.chai.assert);
  });
});
