module.exports = {
  name: 'ember-mocha',

  normalizeEntityName() {
    // this prevents an error when the entityName is
    // not specified (since that doesn't actually matter
    // to us
  },

  afterInstall() {
    return Promise.resolve()
      .then(() => this.removeQUnit());
  },

  removeQUnit() {
    var packages = ['ember-cli-qunit', 'ember-qunit', 'qunit-dom'];
    return this.removePackagesFromProject(packages.map(name => ({ name })));
  },
};
