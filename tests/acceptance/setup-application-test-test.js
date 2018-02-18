import { describe, it } from 'mocha';
import { setupApplicationTest } from 'ember-mocha';
import { expect } from 'chai';
import { setApplication, visit } from '@ember/test-helpers';
import Application from '../../app';
import config from '../../config/environment';
import hasEmberVersion from 'ember-test-helpers/has-ember-version';

describe('setupApplicationTest', function() {
  if (!hasEmberVersion(2, 4)) {
    return;
  }

  setApplication(Application.create(Object.assign({}, config.APP, { autoboot: false })));

  this.timeout(5000);

  setupApplicationTest();

  it('can visit subroutes', async function() {
    await visit('/');
    expect(this.element.querySelector('h2').textContent.trim()).to.be.empty;

    await visit('/foo');
    expect(this.element.querySelector('h2').textContent.trim()).to.be.equal('this is an acceptance test');
  });
});
