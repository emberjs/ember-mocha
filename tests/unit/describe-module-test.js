import Ember from 'ember';
import { describeModule, it } from 'ember-mocha';
import { describe } from 'mocha';
import { expect } from 'chai';

import { setResolverRegistry } from '../helpers/resolver';

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

  describe("skipping and running subsets", function() {
    it("skips the skipped context", function() {
      window.mocha.suite.suites.find(function(suite) {
        return suite.title === "skipped module" && suite.pending;
      });
    });

    it("runs only marked tests", function () {
      var originalHasOnly = window.mocha.options.hasOnly;
      var originalOnlySuitesLength = window.mocha.suite._onlySuites.length;
      window.mocha.options.hasOnly = false;

      describeModule.only("included-module", function () {});
      describeModule.only("included-module-too", function () {});
      describeModule("ignored-module", function () {});

      expect(window.mocha.options.hasOnly).to.be.true;
      expect(window.mocha.suite._onlySuites).to.have.lengthOf(2);

      window.mocha.options.hasOnly = originalHasOnly;
      window.mocha.suite._onlySuites.length = originalOnlySuitesLength;
    });
  });
});
