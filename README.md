
ember-mocha
==============================================================================

[![Latest NPM release][npm-badge]][npm-badge-url]
[![TravisCI Build Status][travis-badge]][travis-badge-url]

[npm-badge]: https://img.shields.io/npm/v/ember-mocha.svg
[npm-badge-url]: https://www.npmjs.com/package/ember-mocha
[travis-badge]: https://img.shields.io/travis/emberjs/ember-mocha/master.svg
[travis-badge-url]: https://travis-ci.org/emberjs/ember-mocha

ember-mocha simplifies unit testing of Ember applications with
[Mocha](https://mochajs.org/) by providing Mocha-specific wrappers around the
helpers contained in
[ember-test-helpers](https://github.com/switchfly/ember-test-helpers).

*Upgrading from an earlier version? Have a look at our
[Upgrade Guide](#upgrading) below.*


Installation
------------------------------------------------------------------------------

### Installation with Ember CLI

In order to use Ember Mocha with [Ember CLI](http://www.ember-cli.com/),
please follow the instructions for
[ember-cli-mocha](https://github.com/switchfly/ember-cli-mocha).

### Standalone Installation

Ember Mocha can also be installed with bower and used directly in any Ember
project:

```sh
$ bower install ember-mocha
```

You can then choose to include the global (`ember-mocha.js`) or AMD
(`ember-mocha.amd.js`) build when running your tests.


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


Upgrading
------------------------------------------------------------------------------

Previous releases promoted the use of `describeModule()`,
`describeComponent()` and `describeModel()` instead of the `describe()`
function of Mocha itself. These functions have been deprecated and replaced
by the `setupTest()` functions mentioned [above](#setup-tests). The following
example will explain how to update your code.

Before:

```js
import {expect} from 'chai';
import {it} from 'mocha';
import {describeModule} from 'ember-mocha';

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
import {expect} from 'chai';
import {it, describe} from 'mocha';
import {setupTest} from 'ember-mocha';

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

- import `it` from `mocha` instead of `ember-mocha`
- replace the `describeModule` import with a `setupTest` import
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


Contributing
------------------------------------------------------------------------------

Contributions are welcome. Please follow the instructions below to install and
test this library.

### Installation

```sh
npm install
```

### Testing

In order to test in the browser:

```sh
npm start
```

... and then visit [http://localhost:4200/tests](http://localhost:4200/tests).

In order to perform a CI test:

```sh
npm test
```


Copyright and License
------------------------------------------------------------------------------

Copyright 2014 Switchfly

This product includes software developed at
Switchfly (http://www.switchfly.com).

NOTICE: Only our own original work is licensed under the terms of the Apache
License Version 2.0. The licenses of some libraries might impose different
redistribution or general licensing terms than those stated in the Apache
License. Users and redistributors are hereby requested to verify these
conditions and agree upon them.

This repository also contains the `ember-mocha-adapter` originally developed
by [Teddy Zeenny](https://github.com/teddyzeenny) at
https://github.com/teddyzeenny/ember-mocha-adapter/ under the MIT license.
