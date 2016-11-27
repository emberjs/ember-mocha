import Ember from 'ember';
import { describeComponent, it } from 'ember-mocha';
import { setResolverRegistry } from 'tests/test-support/resolver';
import { grepFor } from './test-support/mocha-support';
import { describe, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';

var PrettyColor = Ember.Component.extend({
  classNames: ['pretty-color'],
  attributeBindings: ['style'],
  style: function(){
    return 'color: ' + this.get('name') + ';';
  }.property('name')
});

function setupRegistry() {
  setResolverRegistry({
    'component:x-foo': Ember.Component.extend(),
    'component:pretty-color': PrettyColor,
    'template:components/pretty-color': Ember.Handlebars.compile('Pretty Color: <span class="color-name">{{name}}</span>')
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
        layout: Ember.Handlebars.compile("yield me")
      });
      expect(component._state).to.equal('preRender');
      this.render();
      expect(component._state).to.equal('inDOM');
    });

    it('can lookup components in its layout', function() {
      var component = this.subject({
        layout: Ember.Handlebars.compile("{{x-foo id='yodawg-i-heard-you-liked-x-foo-in-ur-x-foo'}}")
      });
      this.render();
      expect(component._state).to.equal('inDOM');
    });

    it('clears out views from test to test', function() {
      this.subject({
        layout: Ember.Handlebars.compile("{{x-foo id='yodawg-i-heard-you-liked-x-foo-in-ur-x-foo'}}")
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
  var grep = grepFor(function() {
    describeComponent.only('only component', function() {
      it("is the only spec");
    });
  });

  describe("skipping and grepping", function() {
    it("skips the skipped context", function() {
      window.mocha.suite.suites.find(function(suite) {
        return suite.title === "skipped component" && suite.pending;
      });
    });
    it("greps for describeComponent.only", function() {
      expect('describeComponent component:only component').to.match(grep);
    });
  });

  describeComponent('pretty-color', 'pretty-color integration test', { integration: true }, function() {
    beforeEach(function() {
      setupRegistry();
    });

    it('renders with color', function() {
      this.set('name', 'green');
      this.render(Ember.Handlebars.compile(`{{pretty-color name=name}}`));
      expect(Ember.$.trim(this.$().text())).to.equal('Pretty Color: green');
    });

    it('renders a second time without', function() {
      this.render(Ember.Handlebars.compile(`{{pretty-color name=name}}`));
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
      this.render(Ember.Handlebars.compile(`{{pretty-color name=name}}`));
      expect(Ember.$.trim(this.$().text())).to.equal('Pretty Color: red');
    });
  });

});
