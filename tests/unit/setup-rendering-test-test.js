import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { setupRenderingTest } from 'ember-mocha2';
import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';
import hbs from 'htmlbars-inline-precompile';
import { click, render } from '@ember/test-helpers';
import hasEmberVersion from '@ember/test-helpers/has-ember-version';

class PrettyColor extends Component {
  @tracked _name;

  get name() {
    return this._name ?? this.args.name;
  }

  get style() {
    return 'color: ' + this.name + ';';
  }

  @action paintItBlack() {
    this._name = 'black';
    if (this.args.onPainted) {
      this.args.onPainted('black');
    }
  }
}

// eslint-disable-next-line ember/no-empty-glimmer-component-classes
class Foo extends Component {}

function setupRegistry(owner) {
  owner.register('component:x-foo', Foo);
  owner.register('component:pretty-color', PrettyColor);
  owner.register('template:components/pretty-color', hbs`<div class="pretty=color">Pretty Color: <button onclick={{fn this.paintItBlack}}><span class="color-name">{{this.name}}</span></button></div>`);
}

describe('setupRenderingTest', function() {
  if (!hasEmberVersion(2, 4)) {
    return;
  }

  describe('pretty-color', function() {
    setupRenderingTest();

    beforeEach(function() {
      setupRegistry(this.owner);
    });

    it('renders with color', async function() {
      this.set('name', 'green');
      await render(hbs`<PrettyColor @name={{this.name}} />`);
      expect(this.element.textContent.trim()).to.equal('Pretty Color: green');
    });

    it('renders when using standard setters', async function() {
      this.name = 'red';
      await render(hbs`<PrettyColor @name={{this.name}} />`);
      expect(this.element.textContent.trim()).to.equal('Pretty Color: red');
    });

    it('renders a second time without', async function() {
      await render(hbs`<PrettyColor @name={{this.name}} />`);
      expect(this.element.textContent.trim()).to.equal('Pretty Color:');
    });

    it('renders a third time with', async function() {
      this.set('name', 'blue');
      expect(this.name).to.equal('blue');
      await render(hbs`<PrettyColor @name={{this.name}} />`);
      expect(this.element.textContent.trim()).to.equal('Pretty Color: blue');
    });

    it('picks up changes to variables set on the context', async function() {
       this.set('name', 'pink');
       await render(hbs`<PrettyColor @name={{this.name}} @onPainted={{fn (mut this.name)}} />`);
       await click('button');
       expect(this.element.textContent.trim()).to.equal('Pretty Color: black');
       expect(this.name).to.equal('black');
       expect(this.name).to.equal('black');
     });

     it('picks up changes to variables set on the context with a standard setter', async function() {
       this.name = 'pink';
       await render(hbs`<PrettyColor @name={{this.name}} @onPainted={{fn (mut this.name)}} />`);
       await click('button');
       expect(this.element.textContent.trim()).to.equal('Pretty Color: black');
       expect(this.name).to.equal('black');
     });
  });

  describe('hooks API', function() {

    let hooks = setupRenderingTest();

    it('returns hooks API', function() {
      expect(hooks)
        .to.respondTo('beforeEach')
        .and.to.respondTo('afterEach');
    });
  });
});
