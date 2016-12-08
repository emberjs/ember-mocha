/* global visit, andThen */

import Ember from 'ember';
import { describe, it, beforeEach, afterEach } from 'mocha';
import { usingAsyncHelpers } from 'ember-mocha';

const { expect } = window.chai;

describe('basic acceptance test', function() {
  this.timeout(5000);

  beforeEach(function() {
    var Router = Ember.Router.extend();

    Router.map(function() {
      this.route('foo');
    });

    var App = Ember.Application.extend({
      rootElement: '#ember-testing',
      Router: Router
    });

    App.FooController = Ember.Controller.extend({
    });

    this.app = startApp(App);
  });

  afterEach(function() {
    Ember.run(this.app, 'destroy');
  });

  it('can visit subroutes', usingAsyncHelpers(function() {
    visit('/');

    andThen(function() {
      expect(find('h2').text()).to.be.empty;
    });

    visit('/foo');

    andThen(function() {
      expect(find('h2').text()).to.be.equal('this is an acceptance test');
    });
  }));
});

function startApp(App, attrs) {
  var application;

  var attributes = Ember.merge({}, attrs);

  Ember.run(function() {
    application = App.create(attributes);
    application.setupForTesting();
    application.injectTestHelpers();
  });

  return application;
}

