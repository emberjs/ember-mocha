
ember-mocha
==============================================================================

[![Latest NPM release][npm-badge]][npm-badge-url]
[![TravisCI Build Status][travis-badge]][travis-badge-url]

[npm-badge]: https://img.shields.io/npm/v/ember-mocha.svg
[npm-badge-url]: https://www.npmjs.com/package/ember-mocha
[travis-badge]: https://img.shields.io/travis/emberjs/ember-mocha/master.svg
[travis-badge-url]: https://travis-ci.org/emberjs/ember-mocha

ember-mocha simplifies testing of Ember applications with
[Mocha](https://mochajs.org/) by providing Mocha-specific wrappers around the
helpers contained in
[@ember/test-helpers](https://github.com/emberjs/ember-test-helpers).

*Upgrading from an earlier version? Have a look at our
[Migration Guide](docs/migration.md).*


Installation
------------------------------------------------------------------------------

`ember-mocha` is an [Ember CLI](http://www.ember-cli.com/) addon, so install it
as you would any other addon:

```sh
$ ember install ember-mocha
```

Some other addons are detecting the test framework based on the installed
addon names and are expecting `ember-cli-mocha` instead. If you have issues
with this then `ember install ember-cli-mocha`, which should work exactly
the same.


Usage
------------------------------------------------------------------------------

The following section describes the use of Ember Mocha with the latest modern
Ember testing APIs, as laid out in the RFCs
[232](https://github.com/emberjs/rfcs/blob/master/text/0232-simplify-qunit-testing-api.md)
and
[268](https://github.com/emberjs/rfcs/blob/master/text/0268-acceptance-testing-refactor.md).

For the older APIs have a look at our [Legacy Guide](docs/legacy.md).

### Setting the Application

Your `tests/test-helper.js` file should look similar to the following, to
correctly setup the application required by `@ember/test-helpers`:

```javascript
import Application from '../app';
import config from '../config/environment';
import { setApplication } from '@ember/test-helpers';

setApplication(Application.create(config.APP));
```

Also make sure that you have set `ENV.APP.autoboot = false;` for the `test`
environment in your `config/environment.js`.

### Setup Tests

The `setupTest()` function can be used to setup a unit test for any kind
of "module/unit" of your application that can be looked up in a container.

It will setup your test context with:

* `this.owner` to interact with Ember's [Dependency Injection](https://guides.emberjs.com/v3.0.0/applications/dependency-injection/)
  system
* `this.set()`, `this.setProperties()`, `this.get()`, and `this.getProperties()`
* `this.pauseTest()` method to allow easy pausing/resuming of tests

For example, the following is a unit test for the `SidebarController`:

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

If you find that test helpers from other addons want you to pass a `hooks`
object you can do so like this:

```javascript
let hooks = setupTest();
setupMirage(hooks);
```

This will make sure that in functions passed to `hooks.afterEach()` the
`this.owner` and other things that `setupTest()` sets up are still available.
Mocha itself runs `afterEach` hooks in a different order than QUnit, which is
why this "workaround" is sometimes needed.


### Setup Rendering Tests

The `setupRenderingTest()` function is specifically designed for tests that
render arbitrary templates, including components and helpers.

It will setup your test context the same way as `setupTest()`, and additionally:

* Initializes Ember's renderer to be used with the
  [Rendering helpers](https://github.com/emberjs/ember-test-helpers/blob/master/API.md#rendering-helpers),
  specifically `render()`
* Adds `this.element` to your test context which returns the DOM element
  representing the wrapper around the elements that were rendered via
  `render()`
* sets up the [DOM Interaction Helpers](https://github.com/emberjs/ember-test-helpers/blob/master/API.md#dom-interaction-helpers)
  from `@ember/test-helpers` (`click()`, `fillIn()`, ...)

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

### Setup Application Tests

The `setupApplicationTest()` function can be used to run tests that interact
with the whole application, so in most cases acceptance tests.

On top of `setupTest()` it will:

* Boot your application instance
* Set up all the [DOM Interaction Helpers](https://github.com/emberjs/ember-test-helpers/blob/master/API.md#dom-interaction-helpers)
  (`click()`, `fillIn()`, ...) as well as the [Routing Helpers](https://github.com/emberjs/ember-test-helpers/blob/master/API.md#routing-helpers)
  (`visit()`, `currentURL()`, ...) from `@ember/test-helpers`

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

Upgrading
------------------------------------------------------------------------------

For instructions how to upgrade your test suite please read our
[Migration Guide](docs/migration.md).

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
