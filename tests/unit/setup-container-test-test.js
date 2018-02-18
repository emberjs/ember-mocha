import { setupContainerTest } from 'ember-mocha';
import { describe, it, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import { pauseTest, resumeTest } from '@ember/test-helpers';
import Service from '@ember/service';
import hasEmberVersion from 'ember-test-helpers/has-ember-version';

describe('setupContainerTest', function() {
  if (!hasEmberVersion(2, 4)) {
    return;
  }

  describe('context setup', function() {

    setupContainerTest();

    afterEach(function() {
      expect(this.owner, 'Context does not leak between tests').to.be.undefined;
    });

    it('sets up owner', function() {
      expect(this.owner, 'Owner exists').to.exist;
      this.owner.register('service:dummy', Service.extend({ foo: 'bar' }));

      let subject = this.owner.lookup('service:dummy');
      expect(subject.get('foo')).to.equal('bar');
    });

    it('has setters and getters', function() {
      expect(this)
        .to.respondTo('get')
        .and.to.respondTo('getProperties')
        .and.to.respondTo('set')
        .and.to.respondTo('setProperties');

      this.set('foo', 'bar');
      expect(this.get('foo')).to.equal('bar');
    });
  });

  describe('pauseTest/resumeTest', function() {

    setupContainerTest();

    it('can pause tests without timeouts', async function() {
      this.timeout(100);

      setTimeout(resumeTest, 200); // resume test after timeout
      // make sure pauseTest does not wait forever, if resumeTest fails
      let timer = setTimeout(() => {
        throw new Error('resumeTest() did not work')
      }, 300);

      await pauseTest();
      clearTimeout(timer);
    });
  });

  describe('context in beforeEach/afterEach hooks', function() {

    // @todo will throw `this.get is not a function` if called after `setupRenderingTest()`
    afterEach(function() {
      expect(this.get('name')).to.equal('blue');
    });

    setupContainerTest();

    beforeEach(function() {
      this.set('name', 'red');
    });

    beforeEach(function() {
      expect(this.get('name')).to.equal('red');
    });

    it('has correct context', async function() {
      expect(this.get('name')).to.equal('red');
      this.set('name', 'blue');
    });
  });
});
