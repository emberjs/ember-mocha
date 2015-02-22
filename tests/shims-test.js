import { describe, it } from 'mocha';

describe('mocha-shim', function() {
  it('should work', function() {
    window.expect(describe).to.equal(window.describe);
    window.expect(it).to.equal(window.it);
  });
});
