import Ember from 'ember';
import { describeComponent, it } from 'ember-mocha';
import { describe, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import hbs from 'htmlbars-inline-precompile';

import { setResolverRegistry } from '../helpers/resolver';

var PrettyColor = Ember.Component.extend({
  classNames: ['pretty-color'],
  attributeBindings: ['style'],
  style: Ember.computed('name', function(){
    return 'color: ' + this.get('name') + ';';
  })
});

function setupRegistry() {
  setResolverRegistry({
    'component:x-foo': Ember.Component.extend(),
    'component:pretty-color': PrettyColor,
    'template:components/pretty-color': hbs`Pretty Color: <span class="color-name">{{name}}</span>`
  });
}

///////////////////////////////////////////////////////////////////////////////

describe('describeComponent', function() {

  describeComponent('x-foo', {

    beforeSetup: function() {
      setupRegistry();
    }

  }, function() {

    it('renders', function() {
      var component = this.subject();
      expect(component._state).to.equal('preRender');
      this.render();
      expect(component._state).to.equal('inDOM');
    });

    it('appends', function() {
      var component = this.subject();
      expect(component._state).to.equal('preRender');
      this.append();
      expect(component._state).to.equal('inDOM');
    });

    it('yields', function() {
      var component = this.subject({
        layout: hbs`yield me`
      });
      expect(component._state).to.equal('preRender');
      this.render();
      expect(component._state).to.equal('inDOM');
    });

    it('can lookup components in its layout', function() {
      var component = this.subject({
        layout: hbs`{{x-foo id='yodawg-i-heard-you-liked-x-foo-in-ur-x-foo'}}`
      });
      this.render();
      expect(component._state).to.equal('inDOM');
    });

    it('clears out views from test to test', function() {
      this.subject({
        layout: hbs`{{x-foo id='yodawg-i-heard-you-liked-x-foo-in-ur-x-foo'}}`
      });
      this.render();
      expect(true).to.equal(true); // rendered without id already being used from another test
    });
  });


  ///////////////////////////////////////////////////////////////////////////////

  describeComponent('pretty-color', {

    beforeSetup: function() {
      setupRegistry();
    }

  }, function() {

    it("has the correct className", function() {
      // first call to this.$() renders the component.
      expect(this.$().is('.pretty-color')).to.be.true;
    });

    it("uses the correct custom template", function() {
      var component = this.subject();

      expect(Ember.$.trim(this.$().text())).to.equal('Pretty Color:');

      Ember.run(function() {
        component.set('name', 'green');
      });

      expect(Ember.$.trim(this.$().text())).to.equal('Pretty Color: green');
    });

    it("$", function() {
      this.subject({name: 'green'});
      expect(Ember.$.trim(this.$('.color-name').text())).to.equal('green');
      expect(Ember.$.trim(this.$().text())).to.equal('Pretty Color: green');
    });
  });

  describeComponent.skip('skipped component', function() {
    it("is skipped", function() {});
  });

  describe("skipping and running subsets", function() {
    it("skips the skipped context", function() {
      window.mocha.suite.suites.find(function(suite) {
        return suite.title === "skipped component" && suite.pending;
      });
    });

    it("runs only marked tests", function() {
      var originalHasOnly = window.mocha.options.hasOnly;
      var originalOnlySuitesLength = window.mocha.suite._onlySuites.length;
      window.mocha.options.hasOnly = false;

      describeComponent.only("included-component", function () {});
      describeComponent.only("included-component-too", function () {});
      describeComponent("ignored-component", function () {});

      expect(window.mocha.options.hasOnly).to.be.true;
      expect(window.mocha.suite._onlySuites).to.have.lengthOf(2);

      window.mocha.options.hasOnly = originalHasOnly;
      window.mocha.suite._onlySuites.length = originalOnlySuitesLength;
    });
  });

  describeComponent('pretty-color', 'pretty-color integration test', { integration: true }, function() {
    beforeEach(function() {
      setupRegistry();
    });

    it('renders with color', function() {
      this.set('name', 'green');
      this.render(hbs`{{pretty-color name=name}}`);
      expect(Ember.$.trim(this.$().text())).to.equal('Pretty Color: green');
    });

    it('renders a second time without', function() {
      this.render(hbs`{{pretty-color name=name}}`);
      expect(Ember.$.trim(this.$().text())).to.equal('Pretty Color:');
    });
  });

  describeComponent('pretty-color', 'context in beforeEach/afterEach hooks', { integration: true }, function() {
    beforeEach(function() {
      setupRegistry();
    });

    beforeEach(function() {
      this.set('name', 'red');
    });

    afterEach(function() {
      expect(this.get('name')).to.equal('red');
    });

    it('renders with color', function() {
      this.render(hbs`{{pretty-color name=name}}`);
      expect(Ember.$.trim(this.$().text())).to.equal('Pretty Color: red');
    });
  });

});
