import Ember from 'ember';
import { describeModel, it } from 'ember-mocha';
import { setResolverRegistry } from 'tests/test-support/resolver';

window.expect = chai.expect;

var Post = DS.Model.extend({
  title: DS.attr(),
  user: DS.attr(),
  comments: DS.hasMany('comment')
});
var Comment = DS.Model.extend({
  post: DS.belongsTo('post')
});

var Whazzit = DS.Model.extend({ gear: DS.attr('string') });
var whazzitCreateRecordCalled = false;
var WhazzitAdapter = DS.FixtureAdapter.extend({
  createRecord: function(){
    whazzitCreateRecordCalled = true;
    return this._super.apply(this, arguments);
  }
});

var ApplicationAdapter = DS.FixtureAdapter.extend();

var registry = {
  'model:post': Post,
  'model:comment': Comment,
  'model:whazzit': Whazzit,
  'adapter:whazzit': WhazzitAdapter,
  'adapter:application': ApplicationAdapter,
};

///////////////////////////////////////////////////////////////////////////////

describeModel('whazzit', 'model:whazzit without adapter', {

  preSetup: function() {
    setResolverRegistry(registry);
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

  preSetup: function() {
    setResolverRegistry(registry);
  },

  teardown: function(){
    whazzitCreateRecordCalled = false;
  }

}, function() {

  it('model is using the WhazzitAdapter', function() {
    var model = this.subject(),
      store = this.store();

    expect(store.adapterFor(model.constructor)).to.be.an.instanceof(WhazzitAdapter);
  });

//TODO - model.save() promise is never fulfilled
//       (broken on this branch as well as on master)
//
// if (DS._setupContainer) {
//   test('creates the custom adapter', function() {
//     expect(2);
//     ok(!whazzitCreateRecordCalled, 'precond - custom adapter is not yet instantiated');
//
//     var model = this.subject();
//
//     return Ember.run(function(){
//       model.set('gear', '42');
//       return model.save().then(function(){
//         ok(whazzitCreateRecordCalled, 'uses the custom adapter');
//       });
//     });
//   });
// } else {
//   test('without DS._setupContainer fails to create the custom adapter', function() {
//     var thrown = false;
//     try {
//       var model = this.subject();
//       Ember.run(function(){
//         model.set('gear', '42');
//         return model.save();
//       });
//     } catch(e) {
//       thrown = true;
//     }
//     ok(thrown, 'error is thrown without DS._setupContainer');
//   });
// }
});

///////////////////////////////////////////////////////////////////////////////

describeModel('whazzit', 'model:whazzit with application adapter', {

  needs: ['adapter:application'],

  preSetup: function() {
    setResolverRegistry(registry);
  }

}, function() {

  it('model is using the ApplicationAdapter', function() {
    var model = this.subject(),
      store = this.store();

    expect(store.adapterFor(model.constructor)).to.be.an.instanceof(ApplicationAdapter);
    expect(store.adapterFor(model.constructor)).to.not.be.an.instanceof(WhazzitAdapter);
  });

});

