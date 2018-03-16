
Migration Guide
==============================================================================

This guide provides instruction for upgrading your test suite
* from the [Legacy APIs](legacy.md) to Ember's latest testing APIs based
  on RFCs
  [232](https://github.com/emberjs/rfcs/blob/master/text/0232-simplify-qunit-testing-api.md)
  and
  [268](https://github.com/emberjs/rfcs/blob/master/text/0268-acceptance-testing-refactor.md).
* from very early releases of Ember Mocha, based on custom `describe*`
  functions to the later introduced `setupTest()` functions, both based on
  Ember's [Legacy APIs](legacy.md)

Upgrading to the new testing APIs
------------------------------------------------------------------------------

For the complete introduction to the new testing APIs, please read the
latest [Ember Guides](https://guides.emberjs.com/v3.0.0/testing/). The
following examples will give you an overview how to migrate your existing Ember
Mocha based test suite.

### Unit tests

Before:

```javascript
import { expect } from 'chai';
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

After:

```javascript
import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupTest } from 'ember-mocha';

describe('SidebarController', function() {
  setupTest();

  // Replace this with your real tests.
  it('exists', function() {
    let controller = this.owner.lookup('controller:sidebar');
    expect(controller).to.be.ok;
  });
});
```

#### Migration steps

* Use `setupTest()` without any arguments to opt into the new testing system
* Use the Owner object given by `this.owner` directly instead of `this.subject()`

### Component tests

Before:

```javascript
import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('GravatarImageComponent', function() {
  setupComponentTest('gravatar-image', {
    integration: true
  });

  it('renders', function() {
    this.render(hbs`{{gravatar-image}}`);
    expect(this.$('img')).to.exist;
  });
});
```

After:

```javascript
import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupRenderingTest } from 'ember-mocha';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

describe('GravatarImageComponent', function() {
  setupRenderingTest();

  it('renders', async function() {
    await render(hbs`{{gravatar-image}}`);
    expect(this.element.querySelector('img')).to.exist;
  });
});
```

#### Migration steps

* Use `setupRenderingTest()` instead of `setupComponentTest()`
* Render using the `render()` helper from `@ember/test-helpers` instead of
  `this.render()`
* `render()` is now always an async call, so use `async`/`await` to wait for it
  to complete
* Use `this.element` to get access to the rendered DOM
* Replace `this.on` when testing action invocation with `this.set` and convert `string` references to the action name with the name of the variable that contains the function
* Do not use jQuery for DOM interaction, instead use the
  [DOM Interaction Helpers](https://github.com/emberjs/ember-test-helpers/blob/master/API.md#dom-interaction-helpers)
  from `@ember/test-helpers`

For migrating to the DOM interaction helpers, you can use the
[ember-test-helpers-codemod](https://github.com/simonihmig/ember-test-helpers-codemod)
to automatically convert all or most of it.

### Acceptance tests

Before:

```javascript
import { describe, it, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import startApp from 'app/tests/helpers/start-app';
import destroyApp from 'app/tests/helpers/destroy-app';

describe('basic acceptance test', function() {
  let application;

  beforeEach(function() {
    application = startApp();
  });

  afterEach(function() {
    destroyApp(application);
  });

  it('can visit /', function() {
    visit('/');

    return andThen(() => {
      expect(currentURL()).to.equal('/');
    });
  });
});
```

After:


```javascript
import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupApplicationTest } from 'ember-mocha';
import { visit, currentURL } from '@ember/test-helpers';

describe('basic acceptance test', function() {
  setupApplicationTest();

  it('can visit /', async function() {
    await visit('/');
    expect(currentURL()).to.equal('/');
  });
});
```

#### Migration steps

* Use `setupApplicationTest()` instead of `setupAcceptanceTest()` or the
  `beforeEach`/`afterEach` hooks from the example above
* Use the [Routing Helpers](https://github.com/emberjs/ember-test-helpers/blob/master/API.md#routing-helpers)
  from `@ember/test-helpers` instead of the global helpers, e.g. `visit`
* Do not use the "global" test helpers for DOM interaction, instead use the
  [DOM Interaction Helpers](https://github.com/emberjs/ember-test-helpers/blob/master/API.md#dom-interaction-helpers)
  from `@ember/test-helpers`
* use `async`/`await` to wait for asynchronous operations like `visit()` or
  `click()`
* use `this.element` to get access to the rendered DOM

For migrating from the global test helpers to those proved by
`@ember/test-helpers`, you can use the
[ember-test-helpers-codemod](https://github.com/simonihmig/ember-test-helpers-codemod)
to assist you with that task.


Upgrading from early releases to the legacy testing API
------------------------------------------------------------------------------

Very early releases promoted the use of `describeModule()`,
`describeComponent()` and `describeModel()` instead of the `describe()`
function of Mocha itself. These functions have been deprecated and replaced
by the `setupTest()` functions mentioned in the [Legacy Guide](legacy.md). The
following example will explain how to update your code.

Before:

```js
import { expect } from 'chai';
import { it } from 'mocha';
import { describeModule } from 'ember-mocha';

describeModule(
  'route:subscribers',
  'Unit: Route: subscribers',
  {
    needs: ['service:notifications']
  },
  function() {
    it('exists', function() {
      let route = this.subject();
      expect(route).to.be.ok;
    });
  }
);
```

After:

```js
import { expect } from 'chai';
import { it, describe } from 'mocha';
import { setupTest } from 'ember-mocha';

describe('Unit: Route: subscribers', function() {
  setupTest('route:subscribers', {
    needs: ['service:notifications']
  });

  it('exists', function() {
    let route = this.subject();
    expect(route).to.be.ok;
  });
});
```

- import `it()` from `mocha` instead of `ember-mocha`
- replace the `describeModule()` import with a `setupTest()` import
- add a `setupTest()` call to the test `function` with the second and third
  argument of the `describeModule()` call (module name and options)
- replace the `describeModule()` call with a `describe()` call with the first
  and fourth argument of the `describeModule()` call (description and test
  function)

Instead of refactoring all your files by hand we recommend to use the
[ember-mocha-codemods](https://github.com/Turbo87/ember-mocha-codemods)
to automatically convert your tests:

```
npm install -g jscodeshift
jscodeshift -t https://raw.githubusercontent.com/Turbo87/ember-mocha-codemods/master/import-it-from-mocha.js tests
jscodeshift -t https://raw.githubusercontent.com/Turbo87/ember-mocha-codemods/master/new-testing-api.js tests
```

This will migrate you to the testing API described in the [Legacy Guide](legacy.md).
After that you can follow the other migration guides above to upgrade to the
new shared testing APIs.
