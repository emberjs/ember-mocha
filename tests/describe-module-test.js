import { describeModule, it } from 'ember-mocha';
import { setResolverRegistry } from 'tests/test-support/resolver';

window.expect = chai.expect;

function setupRegistry() {
  setResolverRegistry({
    'component:x-foo': Ember.Component.extend()
  });
}

var callbackOrder, setupContext, teardownContext, beforeSetupContext, afterTeardownContext;

describeModule('component:x-foo', 'TestModule callbacks', {
  beforeSetup: function() {
    beforeSetupContext = this;
    callbackOrder = [ 'beforeSetup' ];

    setupRegistry();
  },

  setup: function() {
    setupContext = this;
    callbackOrder.push('setup');

    expect(setupContext).to.not.equal(beforeSetupContext);
  },

  teardown: function() {
    teardownContext = this;
    callbackOrder.push('teardown');

    expect(callbackOrder).to.deep.equal([ 'beforeSetup', 'setup', 'teardown']);
    expect(setupContext).to.equal(teardownContext);
  },

  afterTeardown: function() {
    afterTeardownContext = this;
    callbackOrder.push('afterTeardown');

    expect(callbackOrder).to.deep.equal([ 'beforeSetup', 'setup', 'teardown', 'afterTeardown']);
    expect(afterTeardownContext).to.equal(beforeSetupContext);
    expect(afterTeardownContext).to.not.equal(teardownContext);
  }

}, function() {
  it("should call setup callbacks in the correct order", function() {
    expect(callbackOrder).to.deep.equal([ 'beforeSetup', 'setup' ]);
  });
});
