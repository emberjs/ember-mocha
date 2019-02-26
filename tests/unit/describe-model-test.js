import Ember from 'ember';
import DS from 'ember-data';
import { describeModel, it } from 'ember-mocha';
import { describe } from 'mocha';
import { expect } from 'chai';

import { setResolverRegistry } from '../helpers/resolver';
import { grepFor } from '../helpers/grep-for';

/* globals Pretender */

var Adapter = DS.JSONAPIAdapter || DS.FixtureAdapter;

var Whazzit = DS.Model.extend({ gear: DS.attr('string') });
var WhazzitAdapter = Adapter.extend();

var ApplicationAdapter = Adapter;

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
          store = this.store(),
          adapter = DS.JSONAPIAdapter || DS.FixtureAdapter;

      expect(store.adapterFor(model.constructor.modelName)).to.be.an.instanceof(adapter);
      expect(store.adapterFor(model.constructor.modelName)).to.not.be.an.instanceof(WhazzitAdapter);
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
      if (DS.JSONAPIAdapter && ApplicationAdapter === DS.JSONAPIAdapter) {
        new Pretender(function() {
          this.get('/whazzits', function(/* request */) {
            return [200, {"Content-Type": "application/json"}, JSON.stringify({ data: Whazzit.FIXTURES })];
          });
        });
      }
    }

  }, function() {

    it('uses the WhazzitAdapter', function() {
      var model = this.subject(),
          store = this.store();

      expect(store.adapterFor(model.constructor.modelName)).to.be.an.instanceof(WhazzitAdapter);
    });

    it('uses the WhazzitAdapter for a `findAll` request', async function() {
      var store = this.store();

      store = this.store();

      return Ember.run(function() {
        return store.findAll('whazzit', { reload: true });
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

      expect(store.adapterFor(model.constructor.modelName)).to.be.an.instanceof(ApplicationAdapter);
      expect(store.adapterFor(model.constructor.modelName)).to.not.be.an.instanceof(WhazzitAdapter);
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
      window.mocha.suite.suites.find(function(suite) {
        return suite.title === "skipped model" && suite.pending;
      });
    });
    it("greps for describeModel.only", function() {
      expect('describeModel only model').to.match(grep);
    });
  });
});
