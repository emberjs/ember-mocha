
Legacy Guide
==============================================================================

This document describes the use of Ember Mocha with Ember's legacy testing
APIs, which have been superseded by the newer testing system based on the RFCs
[232](https://github.com/emberjs/rfcs/blob/master/text/0232-simplify-qunit-testing-api.md) 
and 
[268](https://github.com/emberjs/rfcs/blob/master/text/0268-acceptance-testing-refactor.md).

Usage
------------------------------------------------------------------------------

### Setting the Resolver

You'll typically want to set a single resolver for your test suite:

```javascript
import resolver from './helpers/resolver';
import { setResolver } from 'ember-mocha';

setResolver(resolver);
```

If you want to use multiple resolvers in your test suite, you can also
call `setResolver` in the `beforeSetup` callback of your test modules.

### Setup Tests

The `setupTest` function can be used to setup a unit test for any kind
of "module/unit" of your application that can be looked up in a container.

For example, the following is a unit test for the `SidebarController`:

```javascript
import { describe, it } from 'mocha';
import { setupTest } from 'ember-mocha';

describe('SidebarController', function() {
  setupTest('controller:sidebar', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });
  
  // Replace this with your real tests.
  it('exists', function() {
    var controller = this.subject();
    expect(controller).to.be.ok;
  });
});

```

The subject is specified as `controller:sidebar`, which is the key that will
be used to look up this controller in the isolated container that will be
created for this test.

#### Setup Component Tests

The `setupComponentTest` function is specifically designed to test components
and provides additional `render` and `$` helpers within a test's context.

```javascript
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';

describe('GravatarImageComponent', function() {
  setupComponentTest('gravatar-image', {
    // specify the other units that are required for this test
    // needs: ['component:foo', 'helper:bar']
  });

  it('renders', function() {
    // creates the component instance
    var component = this.subject();
    expect(component._state).to.equal('preRender');

    // renders the component on the page
    this.render();
    expect(component._state).to.equal('inDOM');
  });
});
```

#### Setup Model Tests

The `setupModelTest` function can be used to test Ember Data models and
provides an additional `store` helper within a test's context.

```javascript
import { describe, it } from 'mocha';
import { setupModelTest } from 'ember-mocha';

describe('Contact', function() {
  setupModelTest('contact', {
    // Specify the other units that are required for this test.
    needs: []
  });
  
  // Replace this with your real tests.
  it('exists', function() {
    var model = this.subject();
    // var store = this.store();
    expect(model).to.be.ok;
  });
});
```


### Acceptance Tests

The `setupAcceptanceTest` function can be used to run acceptance
tests as the name suggests. It will automatically setup an
application instance for you, which is provided at `this.application`.

```javascript
import Ember from 'ember';
import { describe, it } from 'mocha';
import { setupAcceptanceTest } from 'ember-mocha';

var Application = Ember.Application.extend({
  rootElement: '#ember-testing',
});

describe('basic acceptance test', function() {
  setupAcceptanceTest({ Application });

  it('can visit /', function() {
    visit('/');

    andThen(() => {
      expect(currentURL()).to.equal('/');
    });
  });
});
```

#### Using `async/await`

In case your project supports the `async/await` feature of ES2016 you can
simplify the test function to this:

```js
it('can visit /', async function() {
  await visit('/');
  expect(currentURL()).to.equal('/');
});
```

- add the `async` keyword in front of the test `function`
- add `await` in front of all async test helper calls
- remove the `andThen()` wrappers
