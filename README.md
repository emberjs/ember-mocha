# Ember Mocha [![Build Status](https://secure.travis-ci.org/switchfly/ember-mocha.png?branch=master)](http://travis-ci.org/switchfly/ember-mocha)

Ember Mocha simplifies unit testing of Ember applications with Mocha by
providing Mocha-specific wrappers around the helpers contained in
[ember-test-helpers](https://github.com/switchfly/ember-test-helpers).

## Usage

### Usage with Ember CLI

In order to use Ember Mocha with [Ember CLI](http://www.ember-cli.com/),
please follow the instructions for
[ember-cli-mocha](https://github.com/switchfly/ember-cli-mocha).

### Standalone Usage

Ember Mocha can also be installed with bower and used directly in any Ember
project:

```sh
$ bower install ember-mocha
```

You can then choose to include the global (`ember-mocha.js`) or AMD
(`ember-mocha.amd.js`) build when running your tests.


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
