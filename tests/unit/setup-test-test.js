import { setupTest } from 'ember-mocha';
import { tracked } from '@glimmer/tracking';
import { describe, it, beforeEach, afterEach, after } from 'mocha';
import { expect } from 'chai';
import { pauseTest, resumeTest } from '@ember/test-helpers';
import Service from '@ember/service';
import hasEmberVersion from '@ember/test-helpers/has-ember-version';
import { Promise } from 'rsvp';

class Foo extends Service {
  @tracked foo = 'bar';
}

describe('setupTest', function() {
  if (!hasEmberVersion(2, 4)) {
    return;
  }

  describe('context setup', function() {

    setupTest();

    afterEach(function() {
      expect(this.owner, 'Context does not leak between tests').to.be.undefined;
    });

    it('sets up owner', function() {
      expect(this.owner, 'Owner exists').to.exist;
      this.owner.register('service:dummy', Foo);

      let subject = this.owner.lookup('service:dummy');
      expect(subject.foo).to.equal('bar');
    });

    it('has setters and getters', function() {
      expect(this)
        .to.respondTo('get')
        .and.to.respondTo('getProperties')
        .and.to.respondTo('set')
        .and.to.respondTo('setProperties');

      this.set('foo', 'bar');
      expect(this.foo).to.equal('bar');
    });
  });

  describe('pauseTest/resumeTest', function() {

    setupTest();

    it('can pause tests without timeouts', async function() {
      this.timeout(100);

      setTimeout(resumeTest, 200); // resume test after timeout
      // make sure pauseTest does not wait forever, if resumeTest fails
      let timer = setTimeout(() => {
        throw new Error('resumeTest() did not work')
      }, 300);

      // eslint-disable-next-line ember/no-pause-test
      await pauseTest();
      clearTimeout(timer);
    });
  });

  describe('context in beforeEach/afterEach hooks', function() {

    // @todo will throw `this.get is not a function` if called after `setupRenderingTest()`
    afterEach(function() {
      expect(this.name).to.equal('blue');
    });

    setupTest();

    beforeEach(function() {
      this.set('name', 'red');
    });

    beforeEach(function() {
      expect(this.name).to.equal('red');
    });

    it('has correct context', async function() {
      expect(this.name).to.equal('red');
      this.set('name', 'blue');
    });
  });

  describe('hooks API', function() {

    describe('calls hooks in order', function() {
      let calledSteps = [];

      function setupFoo(hooks) {
        hooks.beforeEach(function() {
          expect(this.owner, 'Context is set up already').to.exist;
          expect(calledSteps).to.deep.equal([]);
          calledSteps.push('bE1');
        });
        hooks.afterEach(function() {
          expect(calledSteps, 'afterEach is called in LIFO order').to.deep.equal(['bE1', 'bE2', 'it', 'aE2']);
          calledSteps.push('aE1');
        });
      }

      after(function() {
        expect(calledSteps, 'hooks are called in correct order').to.deep.equal(['bE1', 'bE2', 'it', 'aE2', 'aE1']);
      });

      let hooks = setupTest();
      setupFoo(hooks);

      hooks.beforeEach(function() {
        expect(calledSteps, 'beforeEach is called in FIFO order').to.deep.equal(['bE1']);
        calledSteps.push('bE2');
      });
      hooks.afterEach(function() {
        expect(calledSteps, 'afterEach is called in LIFO order').to.deep.equal(['bE1', 'bE2', 'it']);
        calledSteps.push('aE2');
      });

      it('calls beforeEach/afterEach in FIFO/LIFO order', function() {
        expect(calledSteps, 'it() is called after all beforeEach').to.deep.equal(['bE1', 'bE2']);
        calledSteps.push('it');
      });
    });

    describe('is Promise aware', function() {
      let calledSteps = [];
      function delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
      }

      after(function() {
        expect(calledSteps, 'hooks are called in correct order').to.deep.equal(['bE1', 'bE2', 'it', 'aE2', 'aE1']);
      });

      let hooks = setupTest();

      hooks.beforeEach(function() {
        expect(calledSteps, 'beforeEach waits for promise').to.deep.equal([]);
        return delay(10)
          .then(() => calledSteps.push('bE1'));
      });
      hooks.beforeEach(function() {
        expect(calledSteps, 'beforeEach waits for promise').to.deep.equal(['bE1']);
        return delay(10)
          .then(() => calledSteps.push('bE2'));
      });
      hooks.afterEach(function() {
        expect(calledSteps, 'afterEach waits for promise').to.deep.equal(['bE1', 'bE2', 'it', 'aE2']);
        return delay(10)
          .then(() => calledSteps.push('aE1'));
      });
      hooks.afterEach(function() {
        expect(calledSteps, 'afterEach waits for promise').to.deep.equal(['bE1', 'bE2', 'it']);
        return delay(10)
          .then(() => calledSteps.push('aE2'));
      });

      it('beforeEach/afterEach chain up promises', function() {
        expect(calledSteps, 'it() is called after all beforeEach').to.deep.equal(['bE1', 'bE2']);
        calledSteps.push('it');
      });
    });

  });

});
