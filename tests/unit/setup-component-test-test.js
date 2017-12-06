import Ember from 'ember';
import { setupComponentTest } from 'ember-mocha';
import { describe, it, beforeEach, afterEach } from 'mocha';
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

describe('setupComponentTest', function() {

  describe('x-foo component', function() {
    setupComponentTest('x-foo');

    beforeEach(function() {
      setupRegistry();
    });

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

  describe('pretty-color', function() {
    setupComponentTest('pretty-color');

    beforeEach(function() {
      setupRegistry();
    });

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

  describe('pretty-color integration test', function() {
    setupComponentTest('pretty-color', {
      integration: true
    });

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

  describe('context in beforeEach/afterEach hooks', function() {
    setupComponentTest('pretty-color', {
      integration: true
    });

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
