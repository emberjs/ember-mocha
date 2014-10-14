var concat     = require('broccoli-concat');
var pickFiles  = require('broccoli-static-compiler');
var mergeTrees = require('broccoli-merge-trees');
var compileES6 = require('broccoli-es6-concatenator');

// --- Compile ES6 modules ---

var loader = pickFiles('bower_components', {
  srcDir: 'loader',
  files: ['loader.js'],
  destDir: '/'
});

// TODO - this manual dependency management has got to go!
var klassy = pickFiles('bower_components', {
  srcDir: '/klassy/lib',
  files: ['klassy.js'],
  destDir: '/'
});
var emberTestHelpers = pickFiles('bower_components', {
  srcDir: '/ember-test-helpers/lib',
  files: ['**/*.js'],
  destDir: '/'
});
var deps = mergeTrees([klassy, emberTestHelpers]);

var lib = pickFiles('lib', {
  srcDir: '/',
  files: ['**/*.js'],
  destDir: '/'
});

var tests = pickFiles('tests', {
  srcDir: '/',
  files: ['test-support/resolver.js', '*-test.js'],
  destDir: '/tests'
});

var main = mergeTrees([loader, deps, lib, tests]);
main = compileES6(main, {
  loaderFile: '/loader.js',
  inputFiles: ['**/*.js'],
  ignoredModules: ['ember'],
  outputFile: '/assets/ember-mocha-tests.amd.js'
});

// --- Select and concat vendor / support files ---

var vendor = concat('bower_components', {
  inputFiles: [
    'jquery/dist/jquery.js',
    'handlebars/handlebars.js',
    'ember/ember.js',
    'ember-data/ember-data.js'],
  outputFile: '/assets/vendor.js'
});

var mocha = pickFiles('bower_components', {
  srcDir: '/mocha',
  files: ['mocha.js', 'mocha.css'],
  destDir: '/assets'
});

var chai = pickFiles('bower_components', {
  srcDir: '/chai',
  files: ['chai.js'],
  destDir: '/assets'
});

var adapter = pickFiles('bower_components', {
  srcDir: '/ember-mocha-adapter',
  files: ['adapter.js'],
  destDir: '/assets'
});

var testSupport = concat('bower_components', {
  inputFiles: [
    'ember-cli-shims/app-shims.js',
    '../tests/test-support/test-loader.js'],
  outputFile: '/assets/test-support.js'
});

var testIndex = pickFiles('tests', {
  srcDir: '/',
  files: ['index.html'],
  destDir: '/tests'
});

module.exports = mergeTrees([main, vendor, mocha, chai, adapter, testSupport, testIndex]);

