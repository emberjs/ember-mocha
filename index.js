/* eslint-disable no-console, no-process-exit */

'use strict';

const path = require('path');
const stripIndent = require('common-tags').stripIndent;

module.exports = {
  name: 'ember-mocha2',

  init() {
    this._super.init && this._super.init.apply(this, arguments);

    this.overrideTestCommandFilter();
    this.setTestGenerator();
  },

  postBuild() {
    this.checkPackages();
  },

  checkPackages() {
    var packages = Object.keys(this.project.addonPackages);
    if (packages.indexOf('ember-qunit') !== -1) {
      console.warn('\nIt looks like you are using "ember-qunit" which can cause issues with "ember-mocha2", please remove this package.\n');
      process.exit(1);
    }
  },

  included() {
    this._super.included.apply(this, arguments);

    this.import('vendor/mocha/mocha.js', { type: 'test' });
    this.import('vendor/mocha/mocha.css', { type: 'test' });
    this.import('vendor/ember-mocha2/mocha-configuration.js', { type: 'test' });

    let addonOptions = this.targetOptions();
    let explicitlyDisabledStyles = addonOptions.disableContainerStyles === true;
    if (!explicitlyDisabledStyles) {
      this.import('vendor/ember-mocha2/test-container-styles.css', { type: 'test' });
    }
  },

  targetOptions() {
    if (!this._targetOptions) {
      // 1. check this.parent.options['ember-mocha']
      let targetOptions = this.parent.options && this.parent.options['ember-mocha'];
      // 2. check this.app.options['ember-mocha']
      targetOptions = targetOptions || (this.app && this.app.options && this.app.options['ember-mocha']);
      this._targetOptions = targetOptions || {};
    }

    return this._targetOptions;
  },

  contentFor(type) {
    // Skip if insertContentForTestBody === false.
    if (type === 'test-body' && !(this.targetOptions().insertContentForTestBody === false)) {
      return stripIndent`
        <div id="mocha">
          <div id="ember-mocha">
            <label for="hide-container">
              <input type="checkbox" id="hide-container" /> <span>Hide testing container</span>
            </label>
            <label for="zoom-container">
              <input type="checkbox" id="zoom-container" /> <span>Zoom testing container</span>
            </label>
          </div>
        </div>
        <div id="mocha-fixture"></div>
        <div id="ember-testing-container">
          <div id="ember-testing"></div>
        </div>
      `;
    }
  },

  treeForVendor(tree) {
    const MergeTrees = require('broccoli-merge-trees');
    const Funnel = require('broccoli-funnel');
    let mochaPath = path.dirname(require.resolve('mocha'));

    let mochaTree = new Funnel(this.treeGenerator(mochaPath), {
      destDir: 'mocha',
      annotation: 'ember-mocha2#treeForVendor',
    });

    return new MergeTrees([mochaTree, tree]);
  },

  treeForAddonTestSupport(tree) {
    // intentionally not calling _super here
    // so that can have our `import`'s be
    // import { ... } from 'ember-mocha2';

    return this.preprocessJs(tree, '/', this.name, {
      registry: this.registry,
    });
  },

  overrideTestCommandFilter() {
    let TestCommand = this.project.require('ember-cli/lib/commands/test');

    TestCommand.prototype.buildTestPageQueryString = function(options) {
      let params = [];

      if (options.filter) {
        params.push(`grep=${options.filter}`);

        if (options.invert) {
          params.push('invert=1');
        }
      }

      if (options.query) {
        params.push(options.query);
      }

      return params.join('&');
    };

    TestCommand.prototype.availableOptions.push({
      name: 'invert',
      type: Boolean,
      default: false,
      description: 'Invert the filter specified by the --filter argument',
      aliases: ['i']
    });
  },

  setTestGenerator() {
    this.project.generateTestFile = function(moduleName, tests) {
      var output = `describe('${moduleName}', function() {\n`;

      tests.forEach(function(test) {
        output += `  it('${test.name}', function() {\n`;
        if (test.passed) {
          output +=
            "    // precompiled test passed\n";
        } else {
          output +=
            "    // precompiled test failed\n" +
            `    var error = new chai.AssertionError('${test.errorMessage}');\n` +
            "    error.stack = undefined;\n" +
            "    throw error;\n";
        }
        output +=   "  });\n";
      });

      output += "});\n";

      return output;
    };
  },
};
