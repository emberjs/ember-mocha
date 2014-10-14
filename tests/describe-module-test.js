import { describeModule, it } from 'ember-mocha';
import { setResolverRegistry } from 'tests/test-support/resolver';

window.expect = chai.expect;

function setupRegistry() {
  setResolverRegistry({
    'component:x-foo': Ember.Component.extend()
  });
}

var a = 0;
var b = 0;
var beforeSetupOk = false;
var beforeTeardownOk = false;

describeModule('component:x-foo', 'TestModule callbacks', {
  beforeSetup: function() {
    setupRegistry();

    beforeSetupOk = (a === 0);
    b += 1;
  },

  setup: function() {
    a += 1;
  },

  beforeTeardown: function() {
    beforeTeardownOk = (a === 1);
    b -= 1;
  },

  teardown: function() {
    a -= 1;
  }

}, function() {
  it("beforeSetup callback is called prior to any test setup", function() {
    expect(beforeSetupOk).to.be.truthy;
    expect(b).to.equal(1);
  });

  it("setup callback is called prior to test", function() {
    expect(a).to.equal(1);
  });

  it("teardown callback is called after test", function() {
    expect(a).to.equal(1);
  });

  it("beforeTeardown callback is called prior to any test teardown", function() {
    expect(beforeTeardownOk).to.be.truthy;
    expect(b).to.equal(1);
  });

});


