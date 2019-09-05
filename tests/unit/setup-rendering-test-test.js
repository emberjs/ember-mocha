import Component from '@ember/component';
import { computed } from '@ember/object';
import { setupRenderingTest } from 'ember-mocha';
import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';
import hbs from 'htmlbars-inline-precompile';
import { render } from '@ember/test-helpers';
import hasEmberVersion from 'ember-test-helpers/has-ember-version';

const PrettyColor = Component.extend({
  classNames: ['pretty-color'],
  attributeBindings: ['style'],
  style: computed('name', function() {
    return 'color: ' + this.get('name') + ';';
  })
});

function setupRegistry(owner) {
  owner.register('component:x-foo', Component.extend());
  owner.register('component:pretty-color', PrettyColor);
  owner.register('template:components/pretty-color', hbs`Pretty Color: <span class="color-name">{{name}}</span>`);
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

    it('renders with new color with same property', async function() {
      this.set('name', 'red');
      await render(hbs`{{pretty-color name=name}}`);
      expect(this.element.textContent.trim()).to.equal('Pretty Color: red');
    });

    it('renders a third time without', async function() {
      await render(hbs`{{pretty-color name=name}}`);
      expect(this.element.textContent.trim()).to.equal('Pretty Color:');
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
