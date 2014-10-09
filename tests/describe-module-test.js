import { describeModule, it } from 'ember-mocha';
import { setResolverRegistry } from 'tests/test-support/resolver';

window.expect = chai.expect;

var registry = {
  'component:x-foo': Ember.Component.extend()
};

var a = 0;
var b = 0;
var preSetupOk = false;
var preTeardownOk = false;

describeModule('component:x-foo', 'TestModule callbacks', {
  preSetup: function() {
    setResolverRegistry(registry);

    preSetupOk = (a === 0);
    b += 1;
  },

  setup: function() {
    a += 1;
  },

  preTeardown: function() {
    preTeardownOk = (a === 1);
    b -= 1;
  },

  teardown: function() {
    a -= 1;
  }

}, function() {
  it("preSetup callback is called prior to any test setup", function() {
    expect(preSetupOk).to.be.truthy;
    expect(b).to.equal(1);
  });

  it("setup callback is called prior to test", function() {
    expect(a).to.equal(1);
  });

  it("teardown callback is called after test", function() {
    expect(a).to.equal(1);
  });

  it("preTeardown callback is called prior to any test teardown", function() {
    expect(preTeardownOk).to.be.truthy;
    expect(b).to.equal(1);
  });

});


