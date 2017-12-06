import { describe, it, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import startApp from '../helpers/start-app';
import destroyApp from '../helpers/destroy-app';

describe('basic acceptance test', function() {
  this.timeout(5000);

  let application;

  beforeEach(function() {
    application = startApp();
  });

  afterEach(function() {
    destroyApp(application);
  });

  it('can visit subroutes', function() {
    visit('/');

    andThen(function() {
      expect(find('h2').text()).to.be.empty;
    });

    visit('/foo');

    andThen(function() {
      expect(find('h2').text()).to.be.equal('this is an acceptance test');
    });
  });
});
