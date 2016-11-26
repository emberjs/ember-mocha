define("ember", ["exports"], function(__exports__) {
  __exports__["default"] = window.Ember;
});

var emberMocha = requireModule("ember-mocha");

window.describeModule = emberMocha.describeModule;
window.describeComponent = emberMocha.describeComponent;
window.describeModel = emberMocha.describeModel;
window.it = emberMocha.it;
window.setResolver = emberMocha.setResolver;
window.setupTest = emberMocha.setupTest;
window.setupAcceptanceTest = emberMocha.setupAcceptanceTest;
window.setupComponentTest = emberMocha.setupComponentTest;
window.setupModelTest = emberMocha.setupModelTest;
