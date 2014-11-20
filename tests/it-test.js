import Ember from 'ember';
import { it } from 'ember-mocha';

window.expect = chai.expect;

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
});
