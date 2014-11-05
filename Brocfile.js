var concat     = require('broccoli-concat');
var Funnel     = require('broccoli-funnel');
var mergeTrees = require('broccoli-merge-trees');
var compileES6 = require('broccoli-es6-concatenator');
var jshintTree = require('broccoli-jshint');
var replace    = require('broccoli-string-replace');
var gitInfo    = require('git-repo-info');

// --- Compile ES6 modules ---

var loader = new Funnel('bower_components', {
  srcDir: 'loader',
  files: ['loader.js'],
  destDir: '/assets/'
});

// TODO - this manual dependency management has got to go!
var klassy = new Funnel('bower_components', {
  srcDir: '/klassy/lib',
  files: ['klassy.js'],
  destDir: '/'
});
var emberTestHelpers = new Funnel('bower_components', {
  srcDir: '/ember-test-helpers/lib',
  include: [/.js$/],
  destDir: '/'
});
var deps = mergeTrees([klassy, emberTestHelpers]);

var lib = new Funnel('lib', {
  srcDir: '/',
  include: [/.js$/],
  destDir: '/'
});

var tests = new Funnel('tests', {
  srcDir: '/',
  include: [/test-support\/resolver.js$/, /.js$/],
  destDir: '/tests'
});

var main = mergeTrees([deps, lib]);
main = compileES6(main, {
  inputFiles: ['**/*.js'],
  ignoredModules: ['ember'],
  outputFile: '/ember-mocha.amd.js',
  wrapInEval: false
});

var generatedBowerConfig = new Funnel('build-support', {
  srcDir: '/',
  destDir: '/',
  files: ['bower.json']
});
generatedBowerConfig = replace(generatedBowerConfig, {
  files: ['bower.json'],
  pattern: {
    match: /VERSION_PLACEHOLDER/,
    replacement: function() {
      return gitInfo().abbreviatedSha;
    }
  }
});

var globalizedBuildSupport = new Funnel('build-support', {
  srcDir: '/',
  files: ['iife-start.js', 'globalize.js', 'iife-stop.js'],
  destDir: '/'
});

var globalizedMain = concat(mergeTrees([loader, main, globalizedBuildSupport]), {
  inputFiles: ['iife-start.js', 'assets/loader.js', 'ember-mocha.amd.js', 'globalize.js', 'iife-stop.js'],
  outputFile: '/ember-mocha.js'
});

var jshintLib = jshintTree(lib);
var jshintTest = jshintTree(tests);

var mainWithTests = mergeTrees([deps, lib, tests, jshintLib, jshintTest]);
mainWithTests = compileES6(mainWithTests, {
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

var mocha = new Funnel('bower_components', {
  srcDir: '/mocha',
  files: ['mocha.js', 'mocha.css'],
  destDir: '/assets'
});

var chai = new Funnel('bower_components', {
  srcDir: '/chai',
  files: ['chai.js'],
  destDir: '/assets'
});

var adapter = new Funnel('bower_components', {
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

var testIndex = new Funnel('tests', {
  srcDir: '/',
  files: ['index.html'],
  destDir: '/tests'
});

module.exports = mergeTrees([loader, main, mainWithTests, globalizedMain, vendor, mocha, chai, adapter, testSupport, testIndex, generatedBowerConfig]);
