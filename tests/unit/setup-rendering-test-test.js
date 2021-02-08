import Component from '@ember/component';
import { computed } from '@ember/object';
import { setupRenderingTest } from 'ember-mocha';
import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';
import hbs from 'htmlbars-inline-precompile';
import { click, render } from '@ember/test-helpers';
import hasEmberVersion from '@ember/test-helpers/has-ember-version';

const PrettyColor = Component.extend({
  classNames: ['pretty-color'],
  attributeBindings: ['style'],
  style: computed('name', function() {
    return 'color: ' + this.get('name') + ';';
  }),
  actions: {
    paintItBlack() { this.set('name', 'black'); }
  }
});

function setupRegistry(owner) {
  owner.register('component:x-foo', Component.extend());
  owner.register('component:pretty-color', PrettyColor);
  owner.register('template:components/pretty-color', hbs`Pretty Color: <button {{action "paintItBlack"}}><span class="color-name">{{name}}</span></button>`);
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
      await render(hbs`{{pretty-color name=name}}`);
      expect(this.element.textContent.trim()).to.equal('Pretty Color: green');
    });

    it('renders when using standard setters', async function() {
      this.name = 'red';
      await render(hbs`{{pretty-color name=name}}`);
      expect(this.element.textContent.trim()).to.equal('Pretty Color: red');
    });

    it('renders a second time without', async function() {
      await render(hbs`{{pretty-color name=name}}`);
      expect(this.element.textContent.trim()).to.equal('Pretty Color:');
    });

    it('renders a third time with', async function() {
      this.set('name', 'blue');
      expect(this.get('name')).to.equal('blue');
      await render(hbs`{{pretty-color name=name}}`);
      expect(this.element.textContent.trim()).to.equal('Pretty Color: blue');
    });

    it('picks up changes to variables set on the context', async function() {
       this.set('name', 'pink');
       await render(hbs`{{pretty-color name=name}}`);
       await click('button');
       expect(this.element.textContent.trim()).to.equal('Pretty Color: black');
       expect(this.get('name')).to.equal('black');
       expect(this.name).to.equal('black');
     });

     it('picks up changes to variables set on the context with a standard setter', async function() {
       this.name = 'pink';
       await render(hbs`{{pretty-color name=name}}`);
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
