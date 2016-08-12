# Ember Mocha [![Build Status](https://secure.travis-ci.org/switchfly/ember-mocha.png?branch=master)](http://travis-ci.org/switchfly/ember-mocha)

Ember Mocha simplifies unit testing of Ember applications with Mocha by
providing Mocha-specific wrappers around the helpers contained in
[ember-test-helpers](https://github.com/switchfly/ember-test-helpers).

## Installation

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

## Usage

### Setting the Resolver

You'll typically want to set a single resolver for your test suite:

```javascript
import resolver from './helpers/resolver';
import { setResolver } from 'ember-mocha';

setResolver(resolver);
```

If you want to use multiple resolvers in your test suite, you can also
call `setResolver` in the `beforeSetup` callback of your test modules.

### Test Modules

The `setupModuleTest` function can be used to setup a unit test for any kind
of "module/unit" of your application that can be looked up in a container.

For example, the following is a unit test for the `SidebarController`:

```javascript
import { describe, it } from 'mocha';
import { setupModuleTest } from 'ember-mocha';

describe('SidebarController', function() {
  setupModuleTest('controller:sidebar', {
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

#### Component Test Modules

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

#### Model Test Modules

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

### Asynchronous Testing

Mocha supports asynchronous testing with both promises and callbacks.

```javascript
describe('it', function() {
  it('works with asynchronous tests using callbacks', function(done) {
    setTimeout(function() {
      expect(true).to.equal(true);
      done();
    }, 10);
  });

  it('works with asynchronous tests using promises', function() {
    return new Ember.RSVP.Promise(function(resolve) {
      setTimeout(function() {
        expect(true).to.equal(true);
        resolve();
      }, 10);
    });
  });
});
```

## Contributing

Contributions are welcome. Please follow the instructions below to install and
test this library.

### Installation

```sh
$ npm install
```

### Testing

In order to test in the browser:

```sh
$ npm start
```

... and then visit [http://localhost:4200/tests](http://localhost:4200/tests).

In order to perform a CI test:

```sh
$ npm test
```

## Copyright and License

Copyright 2014 Switchfly

This product includes software developed at
Switchfly (http://www.switchfly.com).

NOTICE: Only our own original work is licensed under the terms of the Apache
License Version 2.0. The licenses of some libraries might impose different
redistribution or general licensing terms than those stated in the Apache
License. Users and redistributors are hereby requested to verify these
conditions and agree upon them.
