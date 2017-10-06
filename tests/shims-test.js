import { mocha, describe, context, it, before, after, beforeEach, afterEach } from 'mocha';

describe('mocha-shim', function() {
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
