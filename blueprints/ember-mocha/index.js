module.exports = {
  name: 'ember-mocha',

  normalizeEntityName() {
    // this prevents an error when the entityName is
    // not specified (since that doesn't actually matter
    // to us
  },

  afterInstall() {
    return Promise.resolve()
      .then(() => this.removeQUnit())
      .then(() => this.addChai());
  },

  removeQUnit() {
    var packages = ['ember-cli-qunit', 'ember-qunit', 'qunit-dom'];
    return this.removePackagesFromProject(packages.map(name => ({ name })));
  },

  addChai() {
    return this.addPackagesToProject([
      { name: 'ember-cli-chai', target: '^0.5.0' },
      { name: 'chai-dom', target: '^1.0.0' },
    ]);
  },
};
