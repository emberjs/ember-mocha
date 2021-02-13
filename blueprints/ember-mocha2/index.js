module.exports = {
  name: 'ember-mocha2',

  normalizeEntityName() {
    // this prevents an error when the entityName is
    // not specified (since that doesn't actually matter
    // to us
  },

  afterInstall() {
    return Promise.resolve()
      .then(() => this.removeQUnit())
      .then(() => this.addChai())
      .then(() => {
        console.log("Please add 'mocha' to the autoImport.exclude setting in your ember-cli-build.js file.");
      });
  },

  removeQUnit() {
    var packages = ['ember-cli-qunit', 'ember-qunit', 'qunit-dom'];
    return this.removePackagesFromProject(packages.map(name => ({ name })));
  },

  addChai() {
    return this.addPackagesToProject([
      { name: 'mocha', target: '^8.0.0' },
      { name: 'chai', target: '^4.3.0' },
      { name: 'chai-dom', target: '^1.0.0' },
    ]);
  },
};
