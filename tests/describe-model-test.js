import Ember from 'ember';
import { describeModel, it } from 'ember-mocha';
import { setResolverRegistry } from 'tests/test-support/resolver';
import { grepFor } from './test-support/mocha-support';

window.expect = chai.expect;

var Whazzit = DS.Model.extend({ gear: DS.attr('string') });
var whazzitAdapterFindAllCalled = false;
var WhazzitAdapter = DS.FixtureAdapter.extend({
  findAll: function(store, type) {
    whazzitAdapterFindAllCalled = true;
    return this._super.apply(this, arguments);
  }
});

var ApplicationAdapter = DS.FixtureAdapter.extend();

function setupRegistry() {
  setResolverRegistry({
    'model:whazzit': Whazzit,
    'adapter:whazzit': WhazzitAdapter,
    'adapter:application': ApplicationAdapter
  });
}

///////////////////////////////////////////////////////////////////////////////

describe('describeModel', function() {

  describeModel('whazzit', 'model:whazzit without adapter', {

    beforeSetup: function() {
      setupRegistry();
    },

    setup: function() {
      Whazzit.FIXTURES = [];
    }

  }, function() {

    it('store exists', function() {
      var store = this.store();
      expect(store).to.be.an.instanceof(DS.Store);
    });

    it('model exists as subject', function() {
      var model = this.subject();
      expect(model).to.exist;
      expect(model).to.be.an.instanceof(DS.Model);
      expect(model).to.be.an.instanceof(Whazzit);
    });

    it('model is using the FixtureAdapter', function() {
      var model = this.subject(),
          store = this.store();

      expect(store.adapterFor(model.constructor)).to.be.an.instanceof(DS.FixtureAdapter);
      expect(store.adapterFor(model.constructor)).to.not.be.an.instanceof(WhazzitAdapter);
    });
  });

  ///////////////////////////////////////////////////////////////////////////////

  describeModel('whazzit', 'model:whazzit with custom adapter', {

    needs: ['adapter:whazzit'],

    beforeSetup: function() {
      setupRegistry();
    },

    setup: function() {
      Whazzit.FIXTURES = [];
      whazzitAdapterFindAllCalled = false;
    }

  }, function() {

    it('uses the WhazzitAdapter', function() {
      var model = this.subject(),
          store = this.store();

      expect(store.adapterFor(model.constructor)).to.be.an.instanceof(WhazzitAdapter);
    });

    it('uses the WhazzitAdapter for a `find` request', function(done) {
      var model = this.subject(),
          store = this.store();

      expect(whazzitAdapterFindAllCalled).to.be.false;

      store = this.store();

      return Ember.run(function() {
        return store.find('whazzit').then(function() {
          expect(whazzitAdapterFindAllCalled).to.be.true;
          done();
        });
      });
    });

  });

  ///////////////////////////////////////////////////////////////////////////////

  describeModel('whazzit', 'model:whazzit with application adapter', {

    needs: ['adapter:application'],

    beforeSetup: function() {
      setupRegistry();
    },

    setup: function() {
      Whazzit.FIXTURES = [];
    }

  }, function() {

    it('uses the ApplicationAdapter', function() {
      var model = this.subject(),
          store = this.store();

      expect(store.adapterFor(model.constructor)).to.be.an.instanceof(ApplicationAdapter);
      expect(store.adapterFor(model.constructor)).to.not.be.an.instanceof(WhazzitAdapter);
    });

  });


  describeModel.skip("skipped model", function() {
    it("is skipped", function() {});
  });

  var grep = grepFor(function() {
    describeModel.only("whazzit", "only model", function() {
      it("is the only model", function() {});
    });
  });

  describe("skipping and grepping", function() {
    it("skips the skipped context", function() {
      var skipped = window.mocha.suite.suites.find(function(suite) {
        return suite.title === "skipped model" && suite.pending;
      });
    });
    it("greps for describeModel.only", function() {
      expect('describeModel only model').to.match(grep);
    });
  });
});
