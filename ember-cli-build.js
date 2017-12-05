var path = require('path');
var resolve = require('resolve');
var concat     = require('broccoli-concat');
var Funnel     = require('broccoli-funnel');
var mergeTrees = require('broccoli-merge-trees');
var eslint = require('broccoli-lint-eslint');
var replace    = require('broccoli-string-replace');
var gitVersion = require('git-repo-version');
var BabelTranspiler = require('broccoli-babel-transpiler');
var Rollup = require('broccoli-rollup');
var nodeResolve = require('rollup-plugin-node-resolve');
var alias = require('rollup-plugin-alias');

function compileES6(tree) {
  return new BabelTranspiler(tree, {
    loose: true,
    moduleIds: true,
    modules: 'amdStrict'
  });
}

module.exports = function(defaults) {
  // --- Compile ES6 modules ---

  var loader = new Funnel('node_modules/loader.js', {
    srcDir: 'dist/loader',
    files: ['loader.js'],
    destDir: '/assets/'
  });

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

  var emberTestHelpersPath = path.dirname(resolve.sync('ember-test-helpers'));

  var emberTestHelpersRollup = new Rollup(emberTestHelpersPath, {
    rollup: {
      entry: 'ember-test-helpers.js',
      dest: 'ember-test-helpers.js',
      format: 'es',
      external: ['ember', 'require'],
      plugins: [
        alias({
          'ember-test-helpers': './ember-test-helpers/',
        }),
      ],
    },
  });

  var mochaRollup = new Rollup(lib, {
    rollup: {
      entry: 'mocha.js',
      dest: 'mocha.js',
      format: 'es',
      external: ['mocha', 'ember'],
      plugins: [
        nodeResolve(),
      ],
    },
  });

  var emberMochaRollup = new Rollup(lib, {
    rollup: {
      entry: 'ember-mocha.js',
      dest: 'ember-mocha.js',
      format: 'es',
      external: ['mocha', 'ember', 'ember-test-helpers'],
      plugins: [
        alias({
          'ember-mocha': './ember-mocha/',
        }),
        nodeResolve(),
      ],
    },
  });

  var main = mergeTrees([emberTestHelpersRollup, mochaRollup, emberMochaRollup]);
  main = concat(compileES6(main), {
    inputFiles: ['**/*.js'],
    outputFile: '/ember-mocha.amd.js'
  });

  var buildExtras = new Funnel('build-support', {
    srcDir: '/',
    destDir: '/',
    files: ['mocha-setup.js', 'ember-mocha-adapter.js']
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

  var eslintLib = eslint(lib, { testGenerator: 'mocha' });
  var eslintTests = eslint(tests, { testGenerator: 'mocha' });

  var testsAndESLint = mergeTrees([tests, eslintLib, eslintTests]);
  testsAndESLint = concat(compileES6(testsAndESLint), {
    inputFiles: ['**/*.js'],
    outputFile: '/assets/ember-mocha-tests.amd.js'
  });

  // --- Select and concat vendor / support files ---

  var vendor = concat('bower_components', {
    inputFiles: [
      'jquery/dist/jquery.js',
      'ember/ember-template-compiler.js',
      'ember/ember.js',
      'pretender/pretender.js',
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

  var appShims = new Funnel('bower_components', {
    files: ['ember-cli-shims/app-shims.js'],
  });

  var testLoader = new Funnel('tests', {
    files: ['test-support/test-loader.js'],
  });

  var testSupport = concat(mergeTrees([appShims, testLoader]), {
    inputFiles: [
      'ember-cli-shims/app-shims.js',
      'test-support/test-loader.js',
    ],
    outputFile: '/assets/test-support.js'
  });

  var testIndex = new Funnel('tests', {
    srcDir: '/',
    files: ['index.html'],
    destDir: '/tests'
  });

  return mergeTrees([loader, main, testsAndESLint, globalizedMain, vendor, mocha, chai, testSupport, testIndex, buildExtras]);
};
