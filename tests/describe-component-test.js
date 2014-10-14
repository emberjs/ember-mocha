import Ember from 'ember';
import { describeComponent, it } from 'ember-mocha';
import { setResolverRegistry } from 'tests/test-support/resolver';

window.expect = chai.expect;

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

    expect($.trim(this.$().text())).to.equal('Pretty Color:');

    Ember.run(function() {
      component.set('name', 'green');
    });

    expect($.trim(this.$().text())).to.equal('Pretty Color: green');
  });

  it("$", function() {
    var component = this.subject({name: 'green'});
    expect($.trim(this.$('.color-name').text())).to.equal('green');
    expect($.trim(this.$().text())).to.equal('Pretty Color: green');
  });
});
