import { describeModule, it } from 'ember-mocha';
import { setResolverRegistry } from 'tests/test-support/resolver';
import { grepFor } from './test-support/mocha-support';
import { describe } from 'mocha';
import { expect } from 'chai';

function setupRegistry() {
  setResolverRegistry({
    'component:x-foo': Ember.Component.extend()
  });
}

var callbackOrder, setupContext, teardownContext, beforeSetupContext, afterTeardownContext;

describe("describeModule", function() {

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

  describeModule.skip("skipped module", function() {
    it("is skipped", function() {});
  });

  var grep = grepFor(function() {
    describeModule.only("component:x-foo", "only module", function() {
      it("is the only module", function() {});
    });
  });

  describe("skipping and grepping", function() {
    it("skips the skipped context", function() {
      var skipped = window.mocha.suite.suites.find(function(suite) {
        return suite.title === "skipped module" && suite.pending;
      });
    });
    it("greps for describeModule.only", function() {
      expect('describeModule only module').to.match(grep);
    });
  });
});
