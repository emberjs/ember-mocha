import { describe, it } from 'mocha';
import { setupAcceptanceTest } from 'ember-mocha';
import { expect } from 'chai';

import App from '../../app';

const Application = App.extend({ rootElement: '#ember-testing' });

describe('setupAcceptanceTest()', function() {
  this.timeout(5000);

  setupAcceptanceTest({ Application });

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
