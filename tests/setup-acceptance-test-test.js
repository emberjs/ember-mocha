/* global visit, andThen */

import Ember from 'ember';
import { describe, it } from 'mocha';
import { setupAcceptanceTest } from 'ember-mocha';

const { expect } = window.chai;

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

describe('setupAcceptanceTest()', function() {
  this.timeout(5000);

  setupAcceptanceTest({ Application: App });

  it('can visit subroutes', function() {
    visit('/');

    andThen(() => {
      expect(find('h2').text()).to.be.empty;
    });

    visit('/foo');

    andThen(() => {
      expect(find('h2').text()).to.be.equal('this is an acceptance test');
    });
  });
});
