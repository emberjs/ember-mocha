import Ember from 'ember';
import { it } from 'ember-mocha';

window.expect = chai.expect;

function tryMochaSpecifier(fn) {
  try {
    fn();
    return null;
  } catch (e) {
    return e;
  }
};

///////////////////////////////////////////////////////////////////////////////

describe('it', function() {
  it('works with synchronous tests', function() {
    expect(true).to.equal(true);
  });

  it('works with asynchronous tests using callbacks', function(done) {
    setTimeout(function() {
      expect(true).to.equal(true);
      done();
    }, 10);
  });

  it('works with asynchronous tests using promises', function() {
    return new Ember.RSVP.Promise(function(resolve) {
      setTimeout(function() {
        expect(true).to.equal(true);
        resolve();
      }, 10);
    });
  });

  var pendingError = tryMochaSpecifier(function() {
    it('is a pending spec');
  });

  it('does not throw errors when you mark a pending spec', function() {
    expect(pendingError).to.be.null;
    var pendingSpec = window.mocha.suite.suites.find(function(suite) {
      return suite.tests.find(function(test) {
        return test.title === 'is a pending spec';
      });
    });
    expect(pendingSpec).to.be.ok;
  });


  it('correctly sets mocha grep options for runing a single test case with.only', function() {
    expect(mochaGrep).to.match(/it runs this test/);
  });
  var originalMochaGrep;
  var mochaGrep;
  it.only('runs this test', function() {});
  mochaGrep = mocha.options.grep;
  mocha.options.grep = originalMochaGrep;


  var skippedError = tryMochaSpecifier(function() {
    it.skip('is a skipped spec');
  });

  it('skips tests with the .skip modifier', function() {
    expect(skippedError).to.be.null;
    var pendingSpec = window.mocha.suite.suites.find(function(suite) {
      return suite.tests.find(function(test) {
        return test.title === 'a skipped spec';
      });
    });
    expect(pendingSpec).to.be.defined;
  });
});